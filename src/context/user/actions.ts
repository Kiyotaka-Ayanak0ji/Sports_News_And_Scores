import { Bounce, toast } from "react-toastify";
import { API_KEY } from "../../config/constants"
import { User, UserLogin } from "../../types/user";
import { customFetch } from "../../utils/middleware";

export interface Data {
    preferences: UserPreferences;
    errors? : string;
}

export interface UserPreferences {
    SelectedSports: string[];
    SelectedTeams: string[]
}

type Reset = {
    new_password: string,
    current_password: string
}

// type UserBody = {
//     name: string;
//     email: string;
//     password: string;
// }

export const fetchUser = async (dispatch:any,bod:UserLogin) => {
    try{
        const url = `${API_KEY}/user/sign_in`;

        const data = await customFetch(url,'POST',false,bod);
        
        const response:User = await data?.json();

        if(!response.errors){
            toast.error("Error in fetching user details !",{
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
            dispatch({type: 'FETCH_USER_FAILURE',payload: "Failed to fetch user"})
        }
        dispatch({type: 'FETCH_USER_SUCCESS',payload: response})

        localStorage.setItem("authToken",response.auth_token);
        localStorage.setItem("userData",JSON.stringify(response.user));
        
        return response;
    }
    catch(error){
        console.log(error);
        toast.error("Error in fetching user details !",{
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
}

export const createUser = async(dispatch: any,user: UserLogin) => {
    
    dispatch({type:'FETCH_USER_REQUEST'});

    try{   
        const url = `${API_KEY}/users`;
        
        const response = await customFetch(url,"POST",false,user);
        
        const d:User = await response?.json();

        if(d.errors){
            dispatch({type: 'FETCH_USER_FAILURE',payload: "Failed to create user"})
        }
        
        dispatch({type: 'FETCH_USER_SUCCESS',payload: d})
        localStorage.setItem("authToken",d.auth_token);
        localStorage.setItem("userData",JSON.stringify(d.user));
        
        
        return d;

    }
    catch(error){
        toast.error("Internal Server Error",{
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

}

export const updateUserPreferences = async(preferences:UserPreferences) => {
    try{
        const url = `${API_KEY}/user/preferences`

        const response = await customFetch(url,"PATCH",true,preferences);

        const data:UserPreferences = await response?.json();

        if(!response?.ok){
            toast.error("Failed to set preferences");
        }

        return data;
    }

    catch(error){
        console.log(error);
        toast.error("Error in updating user preferences",{
            pauseOnHover: false,
            theme: "colored",
            delay: 5000,
            transition: Bounce,
            hideProgressBar: false,
            progress: undefined,
            pauseOnFocusLoss: true,
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true
        });
    }
}

export const updateUserPassword = async(password_rst: Reset) => {
    try{
        const url = `${API_KEY}/user/password`;

        const res = await customFetch(url,"PATCH",true,password_rst)
        
        const data = await res?.json();

        if(!data.ok){
            toast.error("Error in updating user password",{
                pauseOnHover: false,
                theme: "colored",
                delay: 5000,
                transition: Bounce,
                hideProgressBar: false,
                progress: undefined,
                pauseOnFocusLoss: true,
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true
            });
        }

        return data;
    }
    catch(error){
        console.log(error);
        toast.error("Error in updating user password",{
            pauseOnHover: false,
            theme: "colored",
            delay: 5000,
            transition: Bounce,
            hideProgressBar: false,
            progress: undefined,
            pauseOnFocusLoss: true,
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true
        });
    }
} 

export const fetchPreferences = async() => {
    try{
        const url = `${API_KEY}/user/preferences`;
        
        const data = await customFetch(url,"GET",true);

        const response = await data?.json();

        if(!response.ok){
            toast.error("Error in fetching user preferences",{
                pauseOnHover: false,
                theme: "colored",
                delay: 5000,
                transition: Bounce,
                hideProgressBar: false,
                progress: undefined,
                pauseOnFocusLoss: true,
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true
            });
        }
        return response;
    }
    catch(error){
        console.error(error);
        toast.error("Failed to fetch user preferences",{
            pauseOnHover: false,
            theme: "colored",
            delay: 5000,
            hideProgressBar: false,
            pauseOnFocusLoss: true,
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
        });
    }
}