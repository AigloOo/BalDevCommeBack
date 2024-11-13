import { createContext, useContext, useState } from "react";
import enTranslations from "../translations/en";
import frTranslations from "../translations/fr";

type Language = "en" | "fr";
type NestedTranslations = typeof enTranslations;

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, NestedTranslations> = {
  en: enTranslations,
  fr: frTranslations,
};

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

function getNestedValue(obj: NestedTranslations, path: string): string {
  const keys = path.split(".");
  let value = obj;

  for (const key of keys) {
    if (value === undefined || value === null) {
      return path;
    }
    value = value[key];
  }

  return typeof value === "string" ? value : path;
}

export function TranslationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    const translationSet = translations[language];
    return getNestedValue(translationSet, key);
  };

  const value: TranslationContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation(): TranslationContextType {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }

  return context;
}
