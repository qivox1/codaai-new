/**
 * Webinar-Termine — EINE Quelle für /webinar, /en/webinar, WebinarSignup und Event-Schema.
 * 01.10.2026: zwei Termine zur Wahl (Oli). 06.10.2026: Der Termin 13.10. faellt aus — es gibt nur
 * noch den 10.11.2026, 11:00 Uhr. 30.10.2026: Termin auf Di, 24.11.2026, 11:00 Uhr verlegt (Oli/Norbert).
 * Bei nur einem Termin zeigen die Seiten keine Terminwahl mehr,
 * der Slot wird unsichtbar mitgeschickt. Die Seite blendet einen Termin clientseitig aus,
 * sobald dessen Ende (`end`) vorbei ist — ohne neuen Build. `id` ist der Slot, den das
 * Apps Script erwartet (WEBINAR_SLOTS in Code.gs). Achtung Zeitzone: Oktober = MESZ (+02:00),
 * November = MEZ (+01:00).
 */
export interface WebinarSlot {
  id: string;
  start: string;
  end: string;
  de: { day: string; dayLong: string; date: string; dateShort: string; dateLong: string; time: string };
  en: { day: string; dayLong: string; date: string; dateShort: string; time: string };
}

export const WEBINAR_SLOTS: WebinarSlot[] = [
  {
    id: '2026-11-24',
    start: '2026-11-24T11:00:00+01:00',
    end: '2026-11-24T12:00:00+01:00',
    de: { day: 'Di', dayLong: 'Dienstag', date: '24.11.2026', dateShort: '24.11.', dateLong: '24. November 2026', time: '11:00–12:00 Uhr' },
    en: { day: 'Tue', dayLong: 'Tuesday', date: '24 November 2026', dateShort: '24 Nov', time: '11:00–12:00 CET' },
  },
];
