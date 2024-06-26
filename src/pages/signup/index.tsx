import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from "./SignupForm"

const Signup: React.FC = () => {
  // And use it after the h2 tag
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex-col max-w-md w-full px-6 py-8 bg-white dark:bg-sky-200 rounded-lg shadow-xl">
        <h1 className='text-center font-bold text-4xl dark:text-stone-600/60 text-slate-400 m-2 relative top-0'>
          Sign Up
        </h1>
        <SignupForm />
        
        <div className="text-center mt-4">
          <p className="text-sm text-stone-800">Already have an account? 
            <Link to="/signin" className="font-semibold text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
export default Signup;