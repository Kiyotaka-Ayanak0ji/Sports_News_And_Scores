import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { toast, Bounce } from "react-toastify";

type Inputs = {
  Name: string;
  userEmail: string;
  userPassword: string;
};

const SignupForm: React.FC = () => {
  const {
    register,
    handleSubmit,
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = async (parm) => {
    try {
      const { Name, userEmail, userPassword } = parm;
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: Name,
          email: userEmail,
          password: userPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Sign-up failed");
      }
      // extract the response body as JSON data
      const data = await response.json();
      // console.log("data: ", data);
      
      localStorage.setItem("authToken", data.token);
      // if successful, save the user info in localStorage
      localStorage.setItem("userData", JSON.stringify(data.user));
      // redirect to the signin page using the navigate function
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
    <form onSubmit={() => handleSubmit(onSubmit)}>
      <div className='m-2 h-auto flex-col items-center justify-center'>
        <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2"
        >
          Name
        </label>
        <input
            type="name"
            autoFocus
            {...register("Name", { required: true })}
            id="userName"
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
            id="userEmail"
            autoFocus
            {...register("userEmail", { required: true })}
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
            id="userPassword"
            autoFocus
            {...register("userPassword", { required: true })}
            placeholder="Enter your password"
            required
            className="transition delay-100 ease-linear w-full border-2 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-600 focus:shadow-outline-blue"
          />
        </div>
        <div className="w-fit items-center justify-center inline">
          <button
            type="submit"
            className="mt-2 w-full transition delay-100 ease-linear bg-green-500 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring-2 ring-zinc-500"
          >
            Sign Up
          </button>
        </div>
    </form>
  );
};

export default SignupForm;
