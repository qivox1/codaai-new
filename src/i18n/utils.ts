import de from './de.json';
import en from './en.json';

export const languages = {
  de,
  en,
};

export type Language = keyof typeof languages;

export function getTranslations(lang: Language) {
  return languages[lang] || languages.de;
}

export function t(lang: Language, key: string, defaultValue = ''): any {
  const keys = key.split('.');
  let value: any = getTranslations(lang);

  for (const k of keys) {
    value = value?.[k];
  }

  return value !== undefined ? value : defaultValue;
}
