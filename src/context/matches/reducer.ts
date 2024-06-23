import { Team } from "../../types/matches"

export type Match = {
    id: number,
    name: string,
    location: string,
    sportName: string,
    endsAt: string,
    isRunning: boolean,
    teams: Team[]
}

export interface MatchState {
    matches: Match[],
    isLoading: boolean,
    isError: boolean,
    errorMessage: string
}

export const initialState = {
    matches: [],
    isLoading: false,
    isError: false,
    errorMessage: ""
}

export type MatchActions = 
    | {type: "FETCH_MATCHES_REQUEST"}
    | {type: "FETCH_MATCHES_FAILURE", payload: string}
    | {type: "FETCH_MATCHES_SUCCESS", payload: Match[]};

export const reducer = (
    state: MatchState,
    actions: MatchActions
): MatchState => {
    switch(actions.type){
        case "FETCH_MATCHES_REQUEST":
            return {
                ...state,
                isLoading: true
            }
        case "FETCH_MATCHES_FAILURE":
            return{
                ...state,
                isError: true,
                isLoading: false,
                errorMessage: actions.payload
            }
        case "FETCH_MATCHES_SUCCESS":
            return{
                ...state,
                isLoading: false,
                matches: actions.payload
            }
        default:
            return state;
    }
};
