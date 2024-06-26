import { Reducer } from "react";
import { Sport, SportState, initialSportState } from "./types";

export type SportActions =
    | { type: "FETCH_SPORTS_REQUEST" }
    | { type: "FETCH_SPORTS_SUCCESS"; payload: Sport[] }
    | { type: "FETCH_SPORTS_FAILURE"; payload: string }
    | { type: "FETCH_SPORT_REQUEST" }
    | { type: "FETCH_SPORT_SUCCESS"; payload: Sport }
    | { type: "FETCH_SPORT_FAILURE"; payload: string };


export const reducer: Reducer<SportState, any> = (
    state :SportState = initialSportState,
    action: SportActions
    ): SportState => {
  switch (action.type) {
    case "FETCH_SPORTS_REQUEST":
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };
    case "FETCH_SPORTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        sports: action.payload,
      };
    case "FETCH_SPORTS_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "FETCH_SPORT_REQUEST":
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };
    case "FETCH_SPORT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        sport: action.payload,
      };
    case "FETCH_SPORT_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}




