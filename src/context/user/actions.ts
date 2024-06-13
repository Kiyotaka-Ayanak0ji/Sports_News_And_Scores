import { Bounce, toast } from "react-toastify";
import { API_KEY } from "../../config/constants"
import { Preferences, User, UserLogin } from "../../types/user";
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

export const fetchUser = async (bod:UserLogin) => {
    try{
        const url = `${API_KEY}/user/sign_in`;

        const data:User = await customFetch(url,'POST',false,bod);
        
        return data;
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

        dispatch({type: 'FETCH_USER_SUCCESS',payload: response.json()})
        return response;

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

export const updateUserPreferences = async(preferences:Preferences) => {
    try{
        const url = `${API_KEY}/user/preferences`

        const response = await customFetch(url,"PATCH",true,preferences);

        if(!response.ok){
            toast.error("Failed to set preferences");
        }
        else{
            return await fetchPreferences();
        }
    }
    catch(error){
        console.log(error);
        toast.error("Error in updating user preferences");
    }
}

export const updateUserPassword = async(password_rst: Reset) => {
    try{
        const url = `${API_KEY}/user/password`;

        return await customFetch(url,"PATCH",true,password_rst)
    }
    catch(error){
        console.log(error);
        toast.error("Error in updating user password");
    }
} 

export const fetchPreferences = async() => {
    try{
        const url = `${API_KEY}/user/preferences`;
        
        const data:Data = await customFetch(url,"GET",true);

        return data;
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