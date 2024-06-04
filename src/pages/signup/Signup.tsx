import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { customFetch } from '../../utils/middleware';
import { API_KEY } from '../../config/constants';
import { ToastContainer, Bounce, toast } from 'react-toastify';

interface Inputs{
    name: string,
    email: string,
    password: string
}

const SignupForm = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>();

    const onSubmit:SubmitHandler<Inputs> = async(data) => {
        const url = `${API_KEY}/users/sign_in`;

        const response = await customFetch(url,'POST',false,data);

        // if(response.errors){
        //     console.log(response.errors);
        //     throw Error("Error while registering user");
        // }
        localStorage.setItem('userData',response);
        console.log("Registered user successfully");   
    }
  return (
    <div className='bg-white rounded-lg shadow-lg flexbox items-center justify-center'>
        
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

        <div className='flex-col container'>
            <h1 className='font-semibold text-zinc-600 dark:text-amber-500'>
                Signup Form
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                
                {errors && <span>errors</span>}
                
                <label 
                    htmlFor='name'
                    id='name_lbl'
                    className='outline-stone-500 font-semibold text px-2 py-3 mx-auto'>
                        Name
                </label>

                <input 
                    type='text' 
                    placeholder='Enter your name'
                    {...register(() => "name",{required: true, pattern:{}})}
                    className='bg-slate-500 animate-pulse text-black focus: outline-blue-500 outline-none dark:bg-zinc-500 dark:text-amber-500'
                    />
                {errors && toast.error(errors)}
                <label
                    htmlFor='email'
                    id='email_lbl'
                    className='outline-stone-500 font-semibold text px-2 py-3 mx-auto'>
                        Email
                </label>

                <input 
                    type='email' 
                    placeholder='Enter your email'
                    {...register(() => "email",{required: true})}
                    className='bg-slate-500 animate-pulse text-black focus: outline-blue-500 outline-none dark:bg-zinc-500 dark:text-amber-500'
                    />
                {errors && toast.error(errors)}
                <label
                    htmlFor='password'
                    id='password_lbl'
                    className='outline-stone-500 font-semibold text px-2 py-3 mx-auto'>
                        Password
                </label>

                <input 
                    type='text' 
                    placeholder='Enter your password'
                    {...register(() => "password",{required: true})}
                    className='bg-slate-500 animate-pulse text-black focus: outline-blue-500 outline-none dark:bg-zinc-500 dark:text-amber-500'
                />
                {errors && toast.error(errors)}

                <input 
                    type='submit' 
                    className='transition delay-100 ease-in-out rounded-lg px-2 py-3 mx-auto mt-2 bg-green-400 hover:bg-green-600 dark:bg-blue-300 
                    dark:hover:bg-blue-500 focus:outline-amber-400 dark:focus:outline-teal-400'
                />
            </form>
        </div>
    </div>
  )
}

export default SignupForm