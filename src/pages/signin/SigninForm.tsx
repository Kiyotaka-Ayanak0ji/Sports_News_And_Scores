import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants.js";
import { toast, Bounce } from "react-toastify";

type Inputs = {
  email: string;
  password: string;
};

const SigninForm: React.FC = () => {
  const {
    register,
    handleSubmit,
  } = useForm<Inputs>();
  const navigate = useNavigate();

  // Then we will define the handle submit function
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    const message = localStorage.getItem("message");
    
    if (message) {
      localStorage.setItem("message", "");
      toast.error(message,{
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
    
    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json",},
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Sign-in failed");
      }

      console.log("Sign-in successful");

      // extract the response body as JSON data
      const data = await response.json();

      // After successful signin, first we will save the token in localStorage
      localStorage.setItem("authToken", data.auth_token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      
      navigate("/account");
    }
    catch(error){
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
      navigate('/signin');
    }
  };

  return (
    <div className="container items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
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
              autoFocus
              {...register("email", { required: true })}
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
              autoFocus
              {...register("password", { required: true })}
              placeholder="Enter your password"
              required
              className="transition delay-100 ease-linear w-full border-2 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-600 focus:shadow-outline-blue"
            />
          </div>
      {/* <div className="mt-4">
        <label
          htmlFor="password"
          className="block text-gray-700 font-semibold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          autoFocus
          {...register("password", { required: true })}
          placeholder="Enter your password"
          className="w-full border rounded-md py-2 px-3 
          text-gray-700 leading-tight focus:outline-none 
          focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div> */}
      <div className="mt-8">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 items-center
          text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray"
          >
          Sign In
        </button>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
