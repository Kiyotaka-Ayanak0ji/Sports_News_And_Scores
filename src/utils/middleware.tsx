import { Bounce, toast } from "react-toastify";

export type request_type = "GET" | "PATCH" | "POST";

const token = localStorage.getItem("authToken")??"";

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
        response = await fetch(url,{
            method: option,
            headers: {
                "Content-Type": "Application/json",
            },
        })
    }

    //validation logic...
    if(response.ok){
        try{
            const data = await response.json();

            //Store the auth token
            localStorage.setItem("authToken",token);

            //200: success
            console.log(data);

            return data;
        
        }catch(error){
            console.log(error);
            const msg = response.errors || "Internal Server Error";
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
        throw new Error(response.errors);
    }
} 
