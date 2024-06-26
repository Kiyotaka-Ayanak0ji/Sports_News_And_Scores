import { Reducer } from "react";
import { Team, TeamsState, initialTeamsState } from "./types";

export type TeamActions =
    | { type: "FETCH_TEAMS_REQUEST" }
    | { type: "FETCH_TEAMS_SUCCESS"; payload: Team[] }
    | { type: "FETCH_TEAMS_FAILURE"; payload: string }
    | { type: "FETCH_TEAM_REQUEST" }
    | { type: "FETCH_TEAM_SUCCESS"; payload: Team }
    | { type: "FETCH_TEAM_FAILURE"; payload: string };

export const reducer: Reducer<TeamsState, any> = (
    state :TeamsState = initialTeamsState,
    action: TeamActions
    ): TeamsState => {
  switch (action.type) {
    case "FETCH_TEAMS_REQUEST":
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };
    case "FETCH_TEAMS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        teams: action.payload,
      };
    case "FETCH_TEAMS_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "FETCH_TEAM_REQUEST":
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };
    case "FETCH_TEAM_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        team: action.payload,
      };
    case "FETCH_TEAM_FAILURE":
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