import { Bounce, toast } from "react-toastify";
import { isAuth } from "../layout/account/Appbar";

export type request_type = "GET" | "PATCH" | "POST";

const token = isAuth;

export const customFetch = async(url:string ,option: request_type, authRequired?: boolean , body?: any) => {
    let response;
    if(authRequired){
        if(body){
            response = await fetch(url,{
                method: option,
                headers: {
                    "Content-Type": "Application/json",
                    Authorization: `Bearer: ${token}`
                },
                body: JSON.stringify(body)
            })
        }
        else{
            response = await fetch(url,{
                method: option,
                headers: {
                    "Content-Type": "Application/json",
                    Authorization: `Bearer: ${token}`
                },
            })
        }
    }
    else{
        if(body){
            response = await fetch(url,{
                method: option,
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify(body)
            })
        }
        else{
            response = await fetch(url,{
                method: option,
                headers: {
                    "Content-Type": "Application/json",
                },
            })
        }
    }

    //validation logic...
    if(response.ok){
        try{       
            //200: success
            console.log(await response.json());
            
            return response;
            
        }catch(error){
            console.log(error);
            const msg = "Internal Server Error";
            toast.error(msg,{
                pauseOnHover: false,
                theme: "colored",
                delay: 5000,
                transition: Bounce,
                hideProgressBar: false,
                pauseOnFocusLoss: true,
                position: "top-right",
                autoClose: 3000,
                closeOnClick: true
            })
        }
    }
    else{
        toast.error("Internal Server Error",{
            pauseOnHover: false,
            theme: "colored",
            delay: 5000,
            progress:undefined,
            hideProgressBar: false,
            pauseOnFocusLoss: true,
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true
        });
    }
} 
