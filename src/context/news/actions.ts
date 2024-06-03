import { API_KEY } from "../../config/constants"
import { customFetch } from "../../utils/middleware";

export const fetchNews = async(dispatch : any) => {
    try{
        dispatch({type: "FETCH_NEWS_REQUEST"});

        const url = `${API_KEY}/articles`;
    
        const data = await customFetch(url,"GET",true);

        dispatch({type: "FETCH_NEWS_SUCCESS",payload: data});

        return data;
    }
    catch(error){
        dispatch({type: "FETCH_NEWS_FAILURE",payload: "Failed to fetch news articles !"})
        console.error(error);
    }
}

export const fetchNewsArticle = async(dispatch : any,id: number) => {
    try{
        dispatch({type: "FETCH_NEWS_REQUEST"});

        const url = `${API_KEY}/articles/${id}`;
    
        const data = await customFetch(url,"GET",true);

        // dispatch({type: "FETCH_NEWS_SUCCESS",payload: data});

        console.log("Success",data);

        return data;
    }
    catch(error){
        dispatch({type: "FETCH_NEWS_FAILURE",payload: "Failed to fetch news article !"})
        console.error(error);
    }
}