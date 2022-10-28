import { CustomDetector, DetectorOptions } from "i18next-browser-languagedetector";

export interface ReduxDetectorOptions extends DetectorOptions {
  lookupRedux: string;
  cacheUserLanguageRedux(lng: string): void;
}

export interface ReduxDetector extends CustomDetector {
  name: string;
  cacheUserLanguage?(lng: string, options: ReduxDetectorOptions): void;
  lookup(options: ReduxDetectorOptions): string | string[] | undefined;
}

export type LanguageCurrentDisplay = "pt-BR" | "en";
