import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "..";

type ThemeCurrentDisplay = "LIGHT" | "DARK";

interface ThemeCurrentDisplayState {
  current: ThemeCurrentDisplay;
}

const initialState: ThemeCurrentDisplayState = {
  current: "LIGHT",
};

export const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setCurrentTheme(state: ThemeCurrentDisplayState, action: PayloadAction<ThemeCurrentDisplay>) {
      return {
        ...state,
        current: action.payload,
      };
    },
  },
});

export const { setCurrentTheme } = theme.actions;

export const selectTheme = (state: State) => state.theme;

export default theme.reducer;
