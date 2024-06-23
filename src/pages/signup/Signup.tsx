import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { createUser } from '../../context/user/actions';
import { Bounce, toast } from 'react-toastify';
import { useUserDispatch } from '../../context/user/context';
import { User, UserSignup } from '../../types/user';

const SignupForm:React.FC = () => {
    const [name,setUserName] = useState('');
    const [email,setUserEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = async (event :React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const navigate = useNavigate();

        try{
            const body:UserSignup = {
                name: name,
                email: email,
                password: password
            }

            const dispatch = useUserDispatch();
            
            //Get response..
            const data:User = await createUser(dispatch,body);

            if(data.errors){
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
            navigate('/account');

        }catch(error){
            console.error(error);
            toast.error("Internal Server Error",{
              pauseOnHover: false,
              theme: "colored",
              delay: 5000,
              hideProgressBar: false,
              pauseOnFocusLoss: true,
              position: "top-right",
              autoClose: 3000,
              closeOnClick: true
            })
        }
    }
  return (
    <div>
      <h1 className='top-32 ml-48 left-1/3 font-bold text-4xl dark:text-blue-300/60 text-black inline-flex m-2 absolute'>
        Sign Up
      </h1>
      <div className='w-1/2 h-1/2 absolute top-1/4 left-1/4 items-center justify-center rounded-lg shadow-lg shadow-slate-400'>
        <form onSubmit={() => handleSubmit}>
            <div className='m-2 h-auto flex-col items-center justify-center'>
                <label
                    htmlFor="name"
                    className="block text-gray-700 font-semibold mb-2"
                >
                    name
                </label>
                <input
                    type="name"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => { setUserName(e.target.value) }}
                    placeholder="Enter your name"
                    required
                    className="transition ease-linear delay-100 w-full rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none border-2 focus:border-blue-600 focus:shadow-outline-blue"
                />
            </div>
            <div className='m-2 h-auto flex-col items-center justify-center'>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => { setUserEmail(e.target.value) }}
                placeholder="Enter your email"
                required
                className="transition ease-linear delay-100 w-full rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none border-2 focus:border-blue-600 focus:shadow-outline-blue"
              />
            </div>
            <div className="m-2 h-auto flex-col items-center justify-center">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                placeholder="Enter your password"
                required
                className="transition delay-100 ease-linear w-full border-2 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-600 focus:shadow-outline-blue"
              />
            </div>
            <div className="w-fit m-2 items-center justify-center inline">
              <button
                type="submit"
                className="w-auto transition delay-100 ease-linear bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 ring-zinc-500"
              >
                Sign Up
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;