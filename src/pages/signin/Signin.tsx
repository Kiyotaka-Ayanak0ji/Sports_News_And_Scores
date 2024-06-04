import React, { FormEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { customFetch } from '../../utils/middleware';
import { API_KEY } from '../../config/constants';


const SigninForm:React.FC = () => {
    const [email,setUseremail] = useState('');
    const [password,setPassword] = useState('');


    const handleSubmit = async (event :React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try{
            const url = `${API_KEY}/user`;
            const body = {
                email: email,
                password: password
            }
            //Get response..
            const data = await customFetch(url,"POST",true,body);

        }catch(error){
            console.error(error);
        }
    }
  return (
    <form onSubmit={() => handleSubmit}>
      <div>
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
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <div className="mt-4">
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
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <div className="mt-8">
        <button
          type="submit"
          className="transition delay-100 ease-in-out w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray"
        >
          Sign In
        </button>
      </div>

      <br />
      <button className="text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" id="backToHomeButton">
        <a onClick={() => <Navigate to={'/signup'} replace />} className='text-bold text-m'>
          New Here? SignUp
        </a>
      </button>
    </form>
  );
}

export default SigninForm;