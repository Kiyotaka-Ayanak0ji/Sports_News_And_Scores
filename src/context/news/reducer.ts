import { News, NewsState } from "../../types/articles"
import { initialState } from "../../types/articles"

export type NewsActions = 
    | {type: "FETCH_NEWS_REQUEST"}
    | {type: "FETCH_NEWS_SUCCESS",payload: News[]}
    | {type: "FETCH_NEWS_FAILURE",payload: string}

export const reducer = (
    state: NewsState = initialState,
    actions: NewsActions 
): NewsState => {

    switch(actions.type){

        case "FETCH_NEWS_REQUEST":
            return{
                ...state,
                isLoading: true,
            }

        case "FETCH_NEWS_FAILURE":
            return{
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: (actions.payload)??"Failed to fetch news"
            }
        
        case "FETCH_NEWS_SUCCESS":
            return{
                ...state,
                isLoading:false,
                news: actions.payload
            }
        
        default:
            return state;
    }
}

