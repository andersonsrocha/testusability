import { ReduxDetector } from "@types";

/**
 * Custom language detector for redux
 */
export const detector = {
  name: "redux",

  lookup: ({ lookupRedux }) => {
    return lookupRedux || undefined;
  },

  cacheUserLanguage: (lng, options) => {
    if (options.cacheUserLanguageRedux && options.lookupRedux) {
      const currentLanguage = options.lookupRedux;
      if (currentLanguage !== lng) {
        options.cacheUserLanguageRedux(lng);
      }
    }
  },
} as ReduxDetector;
