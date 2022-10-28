import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "./storage/localStorage";
import theme from "./reducers/theme";
import lang from "./reducers/lang";

/**
 * Redux storage configuration
 */
export function configureStorage() {
  const store = configureStore({
    preloadedState: loadState(),
    reducer: {
      theme: theme,
      lang: lang,
    },
  });

  // inscribe an action so that whenever a Redux state changes,
  // it saves the new state in LocalStorage
  store.subscribe(() => {
    saveState(store.getState());
  });

  return store;
}

export const store = configureStorage();

export type Store = ReturnType<typeof configureStorage>;

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
