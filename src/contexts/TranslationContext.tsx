import React, { createContext, useState } from "react";
import enTranslations from "../translations/en";

const Translations = {
  en: enTranslations,
};

interface TranslationContextType {
  t: (key: string) => string;
  currentLanguage: string;
}

export const TranslationContext = createContext<TranslationContextType | null>(
  null
);

export function TranslationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [CurrentLanguage] = useState("en");

  const TranslateKey = (key: string) => {
    const Keys = key.split(".");
    let TranslationValue: Record<string, unknown> = Translations.en;

    for (const CurrentKey of Keys) {
      if (
        TranslationValue &&
        typeof TranslationValue === "object" &&
        CurrentKey in TranslationValue
      ) {
        TranslationValue = TranslationValue[CurrentKey] as Record<
          string,
          unknown
        >;
      } else {
        return key;
      }
    }

    return typeof TranslationValue === "string" ? TranslationValue : key;
  };

  return (
    <TranslationContext.Provider
      value={{ t: TranslateKey, currentLanguage: CurrentLanguage }}
    >
      {children}
    </TranslationContext.Provider>
  );
}
