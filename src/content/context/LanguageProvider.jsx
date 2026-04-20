import { useState, useEffect } from "react";
import { LanguageContext } from "./language-context";

const SUPPORTED_LANGS = ["en", "es"];

function detectBrowserLang() {
  const browserLang = navigator.language?.slice(0, 2).toLowerCase();
  return SUPPORTED_LANGS.includes(browserLang) ? browserLang : "en";
}

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("lang");
    return saved || detectBrowserLang();
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}