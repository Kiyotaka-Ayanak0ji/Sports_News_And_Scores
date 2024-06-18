import {
  PreferencesState,
  UserPreferences,
  initialPreferencesState,
} from "./types";

export type PreferencesActions =
  | { type: "FETCH_PREFERENCES_REQUEST" }
  | { type: "FETCH_PREFERENCES_SUCCESS"; payload: UserPreferences }
  | { type: "FETCH_PREFERENCES_FAILURE"; payload: string }
  | { type: "SET_PREFERENCES_REQUEST" }
  | { type: "SET_PREFERENCES_SUCCESS"; payload: UserPreferences }
  | { type: "SET_PREFERENCES_FAILURE"; payload: string };

export const preferencesReducer = (
  state: PreferencesState = initialPreferencesState,
  action: PreferencesActions
): PreferencesState => {
  switch (action.type) {
    case "FETCH_PREFERENCES_REQUEST":
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };
    case "FETCH_PREFERENCES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: "",
        preferences: action.payload,
      };
    case "FETCH_PREFERENCES_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "SET_PREFERENCES_REQUEST":
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };
    case "SET_PREFERENCES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        errorMessage: "",
        preferences: action.payload,
      };
    case "SET_PREFERENCES_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
