#!/usr/bin/env python3
"""
Maschinenlesbare Herkunftskennzeichnung für die Bilder des Blogs.

  python3 scripts/bild-metadaten.py <datei.webp> --typ ki|foto [--beschreibung "…"] [--credit "…"]

Schreibt einen XMP-Block in die WebP-Datei, ohne das Bild neu zu rechnen:
der vorhandene Bilddatenstrom bleibt Byte für Byte erhalten, der XMP-Block
wird als eigener RIFF-Chunk ergänzt (dafür wird eine einfache WebP-Datei in
das erweiterte Format mit VP8X-Kopf überführt).

Gesetzt wird das IPTC-Feld DigitalSourceType:
  --typ ki    → trainedAlgorithmicMedia  (KI-generiert)
  --typ foto  → digitalCapture           (mit einer Kamera aufgenommen)

Dazu Urheber, Credit, Beschreibung und ein Verweis auf die Seite
https://www.codaai.ai/ki-transparenz/ (Feld WebStatement).

Hintergrund: Design Guide v2.2 Abschnitt 11 und die Seite KI-Transparenz
(Beschluss Oli, 02.11.2026). Der Wächter scripts/check-bild-metadaten.mjs
prüft nach jedem Build, dass die Titelbilder sichtbarer Artikel das Feld tragen.
"""
import argparse, struct, sys
from pathlib import Path

QUELLE = {
    'ki':   'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia',
    'foto': 'http://cv.iptc.org/newscodes/digitalsourcetype/digitalCapture',
}
TRANSPARENZ = 'https://www.codaai.ai/ki-transparenz/'

def xmp_block(typ: str, beschreibung: str, credit: str, urheber: str) -> bytes:
    def esc(t: str) -> str:
        return (t or '').replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')
    return (
        '<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>'
        '<x:xmpmeta xmlns:x="adobe:ns:meta/">'
        '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">'
        '<rdf:Description rdf:about=""'
        ' xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/"'
        ' xmlns:dc="http://purl.org/dc/elements/1.1/"'
        ' xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"'
        ' xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/"'
        f' Iptc4xmpExt:DigitalSourceType="{QUELLE[typ]}"'
        f' photoshop:Credit="{esc(credit)}"'
        f' xmpRights:WebStatement="{TRANSPARENZ}">'
        f'<dc:creator><rdf:Seq><rdf:li>{esc(urheber)}</rdf:li></rdf:Seq></dc:creator>'
        f'<dc:description><rdf:Alt><rdf:li xml:lang="x-default">{esc(beschreibung)}</rdf:li></rdf:Alt></dc:description>'
        '</rdf:Description></rdf:RDF></x:xmpmeta>'
        '<?xpacket end="w"?>'
    ).encode('utf-8')

def chunks(daten: bytes):
    i = 12
    while i + 8 <= len(daten):
        kind = daten[i:i+4]
        groesse = struct.unpack('<I', daten[i+4:i+8])[0]
        nutz = daten[i+8:i+8+groesse]
        yield kind, nutz
        i += 8 + groesse + (groesse & 1)

def masse(kind: bytes, nutz: bytes):
    """Bildbreite und -höhe aus dem Bilddatenstrom."""
    if kind == b'VP8 ':
        if nutz[3:6] != b'\x9d\x01\x2a':
            raise ValueError('kein VP8-Schlüsselbild')
        b, h = struct.unpack('<HH', nutz[6:10])
        return (b & 0x3fff), (h & 0x3fff)
    if kind == b'VP8L':
        bits = int.from_bytes(nutz[1:5], 'little')
        return (bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1
    if kind == b'VP8X':
        b = int.from_bytes(nutz[4:7], 'little') + 1
        h = int.from_bytes(nutz[7:10], 'little') + 1
        return b, h
    raise ValueError(f'unbekannter Chunk {kind!r}')

def packe(kind: bytes, nutz: bytes) -> bytes:
    blk = kind + struct.pack('<I', len(nutz)) + nutz
    return blk + (b'\x00' if len(nutz) & 1 else b'')

def schreibe(pfad: Path, xmp: bytes) -> None:
    daten = pfad.read_bytes()
    if daten[:4] != b'RIFF' or daten[8:12] != b'WEBP':
        raise ValueError(f'{pfad}: keine WebP-Datei')
    teile = list(chunks(daten))
    breite = hoehe = None
    for kind, nutz in teile:
        if kind in (b'VP8 ', b'VP8L', b'VP8X'):
            breite, hoehe = masse(kind, nutz)
            break
    if not breite:
        raise ValueError(f'{pfad}: kein Bilddatenstrom gefunden')

    flaggen = 0x04  # XMP vorhanden
    for kind, nutz in teile:
        if kind == b'VP8X':
            flaggen |= nutz[0]
        if kind == b'ALPH':
            flaggen |= 0x10
    vp8x = bytes([flaggen, 0, 0, 0]) + (breite - 1).to_bytes(3, 'little') + (hoehe - 1).to_bytes(3, 'little')

    rumpf = packe(b'VP8X', vp8x)
    for kind, nutz in teile:
        if kind in (b'VP8X', b'XMP '):
            continue
        rumpf += packe(kind, nutz)
    rumpf += packe(b'XMP ', xmp)
    pfad.write_bytes(b'RIFF' + struct.pack('<I', len(rumpf) + 4) + b'WEBP' + rumpf)

def main() -> int:
    p = argparse.ArgumentParser(description='Herkunftskennzeichnung in eine WebP-Datei schreiben')
    p.add_argument('dateien', nargs='+', type=Path)
    p.add_argument('--typ', choices=sorted(QUELLE), required=True)
    p.add_argument('--beschreibung', default='')
    p.add_argument('--credit', default='')
    p.add_argument('--urheber', default='CodaAI (AMP Beratung)')
    a = p.parse_args()
    credit = a.credit or ('KI-generiert (fal.ai, Nano Banana Pro)' if a.typ == 'ki' else '')
    for d in a.dateien:
        schreibe(d, xmp_block(a.typ, a.beschreibung, credit, a.urheber))
        print(f'{d.name}: {a.typ} gesetzt')
    return 0

if __name__ == '__main__':
    sys.exit(main())
