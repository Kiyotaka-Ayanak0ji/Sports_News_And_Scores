import React from 'react'
import { Navigate } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='bg-zinc-500 text-black dark:bg-white dark:text-stone-700 flex shadow-lg shadow-slate-300'>
        <h2 className='text-semibold text-amber-200'>
            404 Page Not Found.
        </h2>
        <hr/>
        <button onClick={() => <Navigate to="/dashboard" replace/>} className='transition ease-in-out delay-200 rounded-lg shadow-lg outline-nonde mt-2 focus:ring-amber-200 bg-stone-500 text-white dark:bg-blue-500 dark:text-amber-200 dark:focus:ring-slate-300'>
            Back To Home  
        </button>
    </div>
  );
}

export default NotFound;