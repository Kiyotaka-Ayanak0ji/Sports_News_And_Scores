import { API_KEY } from "../../config/constants"
import { Match } from "../../types/matches";
import { customFetch } from "../../utils/middleware";

export const fetchMatches = async(dispatch : any) => {
    try{
        dispatch({type: "FETCH_MATCH_REQUEST"});

        const url = `${API_KEY}/matches`;
    
        const data = await customFetch(url,"GET",true);

        dispatch({type: "FETCH_MATCH_SUCCESS",payload: data});

        return data;
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
    
        const data:Match = await customFetch(url,"GET",true);

        // dispatch({type: "FETCH_Match_SUCCESS",payload: data});

        console.log("Success",data);

        return data;
    }
    catch(error){
        dispatch({type: "FETCH_MATCHES_FAILURE",payload: "Failed to fetch Match !"})
        console.error(error);
    }
}