import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "@config";
import { LanguageCurrentDisplay } from "@types";

interface LanguageCurrentDisplayState {
  current: LanguageCurrentDisplay;
}

const initialState: LanguageCurrentDisplayState = {
  current: "pt-BR",
};

export const lang = createSlice({
  name: "language",
  initialState,
  reducers: {
    setCurrentLang(
      state: LanguageCurrentDisplayState,
      action: PayloadAction<LanguageCurrentDisplay>
    ) {
      return {
        ...state,
        current: action.payload,
      };
    },
  },
});

export const { setCurrentLang } = lang.actions;

export const selectLang = (state: State) => state.lang;

export default lang.reducer;
