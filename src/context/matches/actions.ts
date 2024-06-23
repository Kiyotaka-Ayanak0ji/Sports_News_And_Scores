import { API_KEY } from "../../config/constants"
import { Match } from "../../types/matches";
import { customFetch } from "../../utils/middleware";

export const fetchMatches = async(dispatch : any) => {
    try{
        dispatch({type: "FETCH_MATCH_REQUEST"});

        const url = `${API_KEY}/matches`;
    
        const data = await customFetch(url,"GET",false);

        if(!data?.ok){
            throw new Error("Failed to fetch matches");
        }

        dispatch({type: "FETCH_MATCH_SUCCESS",payload: data});

        const response:Match[] = await data.json();

        return response;
    }
    catch(error){
        dispatch({type: "FETCH_MATCH_FAILURE",payload: "Failed to fetch Matches !"})
        console.error(error);
    }
}

export const fetchMatch = async(dispatch : any,id: number) => {
    try{
        dispatch({type: "FETCH_MATCHES_REQUEST"});

        const url = `${API_KEY}/matches/${id}`;
    
        const data = await customFetch(url,"GET",false);

        // dispatch({type: "FETCH_Match_SUCCESS",payload: data});
        
        const response:Match = await data?.json();

        console.log("Success",response);

        return response;
    }
    catch(error){
        dispatch({type: "FETCH_MATCHES_FAILURE",payload: "Failed to fetch Match !"})
        console.error(error);
    }
}