import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { translations, SUPPORTED_LANGS, DEFAULT_LANG } from './translations';

const LanguageContext = createContext(null);

function getInitialLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  } catch {
    // localStorage tidak tersedia (mode private, dll) -> pakai default
  }
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang);
    } catch {
      /* abaikan */
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    if (SUPPORTED_LANGS.includes(next)) setLangState(next);
  }, []);

  // t('nav.home') -> teks sesuai bahasa aktif.
  // Fallback: bahasa default, lalu key itu sendiri.
  const t = useCallback(
    (key) => {
      const find = (dict) => key.split('.').reduce((obj, k) => obj?.[k], dict);
      return find(translations[lang]) ?? find(translations[DEFAULT_LANG]) ?? key;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage harus dipakai di dalam <LanguageProvider>');
  return ctx;
}
