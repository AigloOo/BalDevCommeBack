import { useContext } from "react";
import { TranslationContext } from "../contexts/TranslationContext";

export function useTranslation() {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }

  return {
    t: context.t,
    currentLanguage: context.currentLanguage,
    isLoading: context.isLoading,
    changeLanguage: context.changeLanguage,
    getDocumentation: context.getDocumentation,
  };
}
