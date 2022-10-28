import { State } from "..";

/**
 * Load redux state from localStorage
 *
 * @returns state
 */
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

/**
 * Save the redux state that is in localStorage
 *
 * @param {*} state
 */
export const saveState = (state: State) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    // ignore
  }
};
