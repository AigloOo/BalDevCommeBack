import React, { createContext, useState, useCallback } from "react";
import enTranslations from "../translations/en";
import frTranslations from "../translations/fr";
import { frenchDocumentation } from "../translations/documentation.fr";

const translations = {
  en: enTranslations,
  fr: frTranslations,
};

const documentationTranslations = {
  fr: frenchDocumentation,
};

interface TranslationContextType {
  t: (key: string) => string;
  currentLanguage: string;
  isLoading: boolean;
  changeLanguage: (lang: string) => void;
  getDocumentation: (category: string) => string | null;
}

export const TranslationContext = createContext<TranslationContextType | null>(
  null
);

export function TranslationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentLanguage, setCurrentLanguage] = useState(
    () => localStorage.getItem("preferred-language") || "en"
  );
  const [isLoading, setIsLoading] = useState(false);

  const changeLanguage = useCallback((lang: string) => {
    setIsLoading(true);
    setCurrentLanguage(lang);
    localStorage.setItem("preferred-language", lang);
    setIsLoading(false);
  }, []);

  const getDocumentation = useCallback(
    (category: string) => {
      if (currentLanguage === "fr") {
        return documentationTranslations.fr[
          category as keyof typeof frenchDocumentation
        ];
      }
      return null;
    },
    [currentLanguage]
  );

  const t = useCallback(
    (key: string) => {
      const keys = key.split(".");
      let value: any =
        translations[currentLanguage as keyof typeof translations];

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k];
        } else {
          return key;
        }
      }

      return typeof value === "string" ? value : key;
    },
    [currentLanguage]
  );

  return (
    <TranslationContext.Provider
      value={{
        t,
        currentLanguage,
        isLoading,
        changeLanguage,
        getDocumentation,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}
