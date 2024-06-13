import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { fetchUser } from '../../context/user/actions';
import { Bounce, toast } from 'react-toastify';

const SigninForm:React.FC = () => {
    const [email,setUseremail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = async (event :React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try{
            const body = {
                email: email,
                password: password
            }
            //Get response..
            const data = await fetchUser(body);

            return data;

        }catch(error){
            console.error(error);
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
            })
        }
    }
  return (
    <div>
      <h1 className='top-32 ml-48 left-1/3 font-bold text-4xl dark:text-amber-300/60 text-black inline-flex m-2 absolute'>
        Sign In
      </h1>
      <div className='w-1/2 h-1/2 absolute top-1/4 left-1/4 items-center justify-center rounded-lg shadow-lg shadow-slate-400'>
        <form onSubmit={() => handleSubmit}>
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
                onChange={(e) => { setUseremail(e.target.value) }}
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
                Sign In
              </button>
            </div>
        </form>
        <div className='mt-2 m-2 absolute flex items-center justify-center'>
          <button className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" id="backToHomeButton">
            <a onClick={() => <Navigate to={'/signup'} replace />} className='text-bold text-m'>
              New Here? SignUp
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SigninForm;