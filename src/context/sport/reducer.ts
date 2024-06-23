import { Sport } from "../../types/sports"

export interface SportState {
    sports: Sport[],
    isLoading: boolean,
    isError: boolean,
    errorMessage: string
}

export const initialSportState:SportState = {
    sports: [],
    isLoading: false,
    isError: false,
    errorMessage: ""
} 

export type SportActions = 
    | {type: "FETCH_SPORTS_REQUEST"}
    | {type: "FETCH_SPORTS_SUCCESS",payload: Sport[]}
    | {type: "FETCH_SPORTS_FAILURE",payload: string};

export const reducer = (
    state: SportState = initialSportState,
    action: SportActions
): SportState => {
    switch(action.type){

        case "FETCH_SPORTS_FAILURE":
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: (action.payload)??"Failed to fetch sports"
            }

        case "FETCH_SPORTS_SUCCESS":
            return {
                ...state,
                isLoading: true,
                isError: false,
                sports: action.payload
            }
        
        case "FETCH_SPORTS_REQUEST":
            return {
                ...state,
                isLoading: true
            }

        default:
            return state;
    }
};

