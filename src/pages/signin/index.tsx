import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import SigninForm from './SigninForm.tsx';

const Signin: React.FC = () => {
  
  // And use it after the h1 tag
  const message = localStorage.getItem('message');
  localStorage.setItem('message', "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 dark:bg-sky-200 bg-white rounded-lg shadow-xl">
        {message && <div className="text-center mt-4">
          <p className="text-sm text-red-600">{message}</p>
        </div>}
        <h1 className='font-bold text-4xl dark:text-stone-600/60 text-black text-center m-2'>
        
          Sign In
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <SigninForm />
        </Suspense>
        
        <div className="text-center mt-4">
          <p className="text-sm text-stone-800">
            Don't have an account? <Link to="/signup" className="font-semibold text-amber-600 hover:underline">
            Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Signin;