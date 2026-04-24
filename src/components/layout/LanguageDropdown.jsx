// src/components/LanguageDropdown.jsx
import { useState } from "react";
import { useLanguage } from "../../content/context/language-context";

const LANGS = [
  { code: "en", label: "🇺🇸 EN" },
  { code: "es", label: "🇪🇸 ES" },
  { code: "pt", label: "🇵🇹 PT" },
];

export default function LanguageDropdown() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  const current = LANGS.find(l => l.code === lang);

  return (
    <div className="lang-dropdown">
      <button
        className="btn-outline-white btn-outline-white--lang"
        onClick={() => setOpen(!open)}
      >
        {current?.label}
      </button>

      {open && (
        <div className="lang-menu">
          {LANGS.map(l => (
            <div
              key={l.code}
              className={`lang-item ${lang === l.code ? "active" : ""}`}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
            >
              {l.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}