import { Team } from "../../types/matches";

export interface TeamState{
    teams: Team[],
    isLoading: boolean,
    isError: boolean,
    errorMessage: string
}

export const initialTeamState:TeamState = {
    teams: [],
    isLoading: false,
    isError: false,
    errorMessage: ""
} 

export type TeamActions = 
    | {type: 'FETCH_TEAM_REQUEST'}
    | {type:'FETCH_TEAM_SUCCESS',payload: Team[]}
    | {type:'FETCH_TEAM_FAILURE',payload: string};

export const reducer = (
    state: TeamState = initialTeamState,
    action: TeamActions
): TeamState => {
    switch(action.type){
        case "FETCH_TEAM_REQUEST":
            return{
                ...state,
                isLoading: true,
            }
        case "FETCH_TEAM_SUCCESS":
            return{
                ...state,
                isLoading: false,
                teams: action.payload
            }
        case "FETCH_TEAM_FAILURE":
            return{
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}