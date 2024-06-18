import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants.js";

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
    }
    {message && <div className="text-red-500 text-center">{message}</div>}
    
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
      // console.log("data.token: ", data.auth_token);
      // console.log("authToken: ", localStorage.getItem("authToken"));
      // redirect to the dashboard page using the navigate function
      navigate("/account");
    } catch (error) {
      console.error("Sign-in failed:", error);
      localStorage.setItem("message", "Sign in failed. Please try again.");
      navigate("/signin");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="Email"
          className="block text-gray-700 font-semibold mb-2"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          autoFocus
          {...register("email", { required: true })}
          placeholder="Enter your email"
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
          autoFocus
          {...register("password", { required: true })}
          placeholder="Enter your password"
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <div className="mt-8">
        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SigninForm;
