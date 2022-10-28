import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { setCurrentLang } from "@config";
import { initReactI18next } from "react-i18next";
import { ReduxDetectorOptions, LanguageCurrentDisplay } from "@types";
import { detector } from "./detector";
import { Store } from "../store";

// creates an instance of a language detector
const languageDetector = new LanguageDetector();
// adds a custom language detector
languageDetector.addDetector(detector);

/**
 * Function to create i18n configuration (internationalization)
 *
 * @param store
 * @returns
 */
export function configureI18n(store: Store) {
  i18n
    .use(Backend)
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      initImmediate: false,
      fallbackLng: "pt-BR", // if you can't find the translation, by default translate to pt-BR
      debug: import.meta.env.DEV, // if debug
      returnObjects: true,
      defaultNS: "common",
      ns: ["common"],
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
      detection: {
        order: ["redux", "navigator"],
        lookupLocalStorage: "lng",
        lookupRedux: store.getState().lang.current,
        cacheUserLanguageRedux: (lng) =>
          store.dispatch(setCurrentLang(lng as LanguageCurrentDisplay)),
      } as ReduxDetectorOptions,
    });

  return i18n;
}
