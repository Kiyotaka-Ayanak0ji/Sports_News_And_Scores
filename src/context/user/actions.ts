import { Bounce, toast } from "react-toastify";
import { API_KEY } from "../../config/constants"
import { Preferences, UserLogin } from "../../types/user";
import { customFetch } from "../../utils/middleware";

export interface Data {
    preferences: UserPreferences;
    errors?: string;
}

export interface UserPreferences {
    SelectedSports: string[];
    SelectedTeams: string[]
}

type Reset = {
    new_password: string,
    current_password: string
}

export const fetchUser = async (dispatch:any,bod: UserLogin) => {
    
    let data;
    
    try {
        dispatch({type:"FETCH_USER_REQUEST"});

        const url = `${API_KEY}/user/sign_in`;

        data = await customFetch(url, 'POST', false, bod);
        
        data = await data?.json();

        dispatch({type:"FETCH_SUCCESS_REQUEST",payload: data.user});
    }
    catch (error) {
        console.log(error);
        toast.error("Error in fetching user details !", {
            pauseOnHover: false,
            theme: "colored",
            delay: 5000,
            transition: Bounce,
            hideProgressBar: false,
            pauseOnFocusLoss: true,
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true
        });
    }
    if(data.ok){
        localStorage.setItem("authToken", data.auth_token);
        localStorage.setItem("userData", JSON.stringify(data.user));
    }

    
    return data;
}

export const createUser = async (dispatch: any, user: UserLogin) => {

    let response;
    
    try {
        dispatch({ type: 'FETCH_USER_REQUEST' });

        const url = `${API_KEY}/users`;

        response = await customFetch(url, "POST", false, user);

        response = await response?.json();

        dispatch({ type: 'FETCH_USER_SUCCESS', payload: response.user });

    }
    catch (error) {
        toast.error("Internal Server Error", {
            pauseOnHover: false,
            theme: "colored",
            delay: 5000,
            transition: Bounce,
            hideProgressBar: false,
            pauseOnFocusLoss: true,
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true
        });
    }
    
    localStorage.setItem("authToken", response.auth_token);
    localStorage.setItem("userData", JSON.stringify(response.user));
    
    return response;
}

export const updateUserPreferences = async (preferences: UserPreferences) => {
    try {
        const url = `${API_KEY}/user/preferences`

        const response = await customFetch(url, "PATCH", true, preferences);

        const data = await response?.json();

        if (!data.ok) {
            toast.error("Failed to set preferences",{
                pauseOnHover: false,
                theme: "colored",
                delay: 5000,
                hideProgressBar: false,
                progress: undefined,
                pauseOnFocusLoss: true,
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true,
            });
        }
        else {
            return await fetchPreferences();
        }
    }
    catch (error) {
        console.log(error);
        toast.error("Error in updating user preferences");
    }
}

export const updateUserPassword = async (password_rst: Reset) => {
    try {
        const url = `${API_KEY}/user/password`;

        const resp= await customFetch(url, "PATCH", true, password_rst)
        
        return await resp?.json();
    }
    catch (error) {
        console.log(error);
        toast.error("Error in updating user password");
    }
}

export const fetchPreferences = async () => {
    try {
        const url = `${API_KEY}/user/preferences`;

        const data: Data = await customFetch(url, "GET", true);

        return data;
    }
    catch (error) {
        console.error(error);
        toast.error("Failed to fetch user preferences", {
            pauseOnHover: false,
            theme: "colored",
            delay: 5000,
            progress: undefined,
            hideProgressBar: false,
            pauseOnFocusLoss: true,
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
        });
    }
}