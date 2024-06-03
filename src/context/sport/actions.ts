import { API_KEY } from "../../config/constants"
import { customFetch } from "../../utils/middleware";

export const fetchSports = async(dispatch: any) => {
    try{
        dispatch({type:"FETCH_SPORTS_REQUEST"});
    
        const url = `${API_KEY}/sports`;
        const data = await customFetch(url,'GET',true);
    
        dispatch({type:"FETCH_SPORTS_SUCCESS",payload:data});
    }catch(error){
        console.log(error);
        dispatch({type:"FETCH_SPORTS_FAILURE",payload:'Unable to fetch sports'});
    }
}

export const fetchSport = async(dispatch: any,id: number) => {
    try{
        dispatch({type:"FETCH_SPORTS_REQUEST"});
    
        const url = `${API_KEY}/sports/${id}`;
        const data = await customFetch(url,'GET',true);
    
        // dispatch({type:"FETCH_SPORTS_SUCCESS",payload:data});

        console.log("Success",data);

        return data;
    }catch(error){
        console.log(error);
        dispatch({type:"FETCH_SPORTS_FAILURE",payload:'Unable to fetch sport(s)'});
    }
}