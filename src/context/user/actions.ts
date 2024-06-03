import { toast } from "react-toastify";
import { API_KEY } from "../../config/constants"
import { Preferences } from "../../types/user";
import { customFetch } from "../../utils/middleware";

type Reset = {
    new_password: string,
    current_password: string
}

// type UserBody = {
//     name: string;
//     email: string;
//     password: string;
// }

export const fetchUser = async () => {
    try{
        const url = `${API_KEY}/user`;

        const data = await customFetch(url,'GET',true);
        
        return data;
    }
    catch(error){
        console.log(error);
        toast.error("Error in fetching user details !");
    }
}

// export const createUser = async(dispatch: any,user: UserBody) => {
//     try{   
//         const url = `${API_KEY}/users`;
    
//         return await customFetch(url,"POST",false,user);
//     }
//     catch(error){
//         console.log(error);
//     }
// }

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
        
        const data = await customFetch(url,"GET",true);

        return data;
    }
    catch(error){
        console.error(error);
        toast.error("Failed to fetch user preferences");
    }
}