import { API_KEY } from "../../config/constants"
import { customFetch } from "../../utils/middleware";

export const fetchTeams = async (dispatch: any) => {
    try{
        dispatch({type:"FETCH_TEAM_REQUEST"});

        const url = `${API_KEY}/teams`;
        const data = await customFetch(url,'GET',true);

        dispatch({type:"FETCH_TEAM_SUCCESS",payload: data});

        const res = await data?.json();
        
        return res; 
    }
    catch(error){
        console.log(error);
        dispatch({type:"FETCH_TEAM_FAILURE",payload:"Unable to fetch teams"});
    }
};

export const fetchTeam = async (dispatch: any,id: number) => {
    try{
        dispatch({type:"FETCH_TEAM_REQUEST"});

        const url = `${API_KEY}/teams/${id}`;
        const data = await customFetch(url,'GET',true);

        // dispatch({type:"FETCH_TEAM_SUCCESS",payload: data});

        console.log("Success",data);

        return data;
    }
    catch(error){
        console.log(error);
        dispatch({type:"FETCH_TEAM_FAILURE",payload:"Unable to fetch teams"});
    }
}; 
