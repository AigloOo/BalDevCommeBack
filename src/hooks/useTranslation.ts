import {
  TranslationProvider,
  useTranslation as useTranslationHook,
} from "../contexts/TranslationContext";

export const useTranslation = () => {
  return useTranslationHook();
};

export { TranslationProvider };
