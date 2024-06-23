import { Preferences, User } from "../../types/user";

export interface UserState {
    user: User,
    isLoading: boolean,
    isError: boolean,
    errorMessage: string
}

const p: Preferences = {
    sports: [],
    teams: [],
    articles:[],
    matches:[]
}
 
const u: User = {
    user: {
        id: 0,
        email: "",
        name:"",
        preferences:{
            SelectedSports: [],
            SelectedTeams: []
        },
    },
    errors: [],
    auth_token: ""
}

export const initialState:UserState = {
    user: u,
    isLoading: false,
    isError: false,
    errorMessage: ""
}

export type UserActions = 
    | {type: "FETCH_USER_REQUEST"}
    | {type: "FETCH_USER_SUCCESS",payload: User}
    | {type: "FETCH_USER_FAILURE",payload: string}
    | {type: "FETCH_USER_PREFERENCES"}
    | {type: "UPDATE_USER_PASSWORD"}
    | {type: "UPDATE_USER_PREFERENCES"}
    | {type: "UPDATION_ERROR"}

export const reducer = (
    state: UserState,
    action: UserActions
): UserState => {
    switch(action.type){
        case "FETCH_USER_REQUEST":
            return {
                ...state,
                isLoading: true
            }

        case "FETCH_USER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                user: action.payload
            }
        
        case "FETCH_USER_FAILURE":
            return{
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload
            }
        case "FETCH_USER_PREFERENCES":
            return{
                ...state,
                isLoading: false
            }

        case "UPDATE_USER_PASSWORD":
            return{
                ...state,
                isLoading: true
            }

        case "UPDATE_USER_PREFERENCES":
            return{
                ...state,
                isLoading: true
            }

        case "UPDATION_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: "Unable to update user data !"
            }
        default:
            return state;
    }
}
    