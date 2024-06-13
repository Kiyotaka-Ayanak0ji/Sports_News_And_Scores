import React, { useState } from "react";
import { customFetch } from "../../utils/middleware";
import { API_KEY } from "../../config/constants";
import { Bounce, ToastContainer, toast } from "react-toastify";

const ResetForm:React.FC = () => {
    const [oldPassword,setOldPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const body = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        const url = `${API_KEY}/user/password`;
        const data = await customFetch(url,"PATCH",true,body);

        if(data.errors){
            console.log("Errors Recieved: ",data.errors);
            toast.error("Error in updating password");
        }
    }

    return(
      <div className="flex mx-auto">
          <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss={false}
                rtl={false}
                draggable
                theme={"light"}
                transition = {Bounce}
          />
        <form onSubmit={() => handleSubmit}>
            <div className="flex items-center mt-2">
                <label className="text">
                    Old Password
                </label>
                <input 
                    type="text"
                    value={oldPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="rounded-lg shadow-lg bg-zinc-400 dark:bg-blue-600 focus:outline-none"/>
            </div>

            <div className="flex items-center mt-2">
                <label className="text">
                    Old Password
                </label>
                <input 
                    type="text"
                    value={oldPassword}
                    required
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="rounded-lg shadow-lg bg-zinc-400 dark:bg-blue-600 focus:outline-none"/>
            </div>
            <div className="mt-8 flex items-center">
                <button
                type="submit"
                className="transition delay-100 ease-in-out w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray"
                >
                    Reset Password
                </button>
            </div>
        </form>
      </div>
    )
}

export default ResetForm;