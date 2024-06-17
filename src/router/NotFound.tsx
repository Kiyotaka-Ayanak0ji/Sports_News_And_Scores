import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='bg-sky-600 absolute ml-24 mt-25 top-1/3 left-1/4 w-1/3 h-1/3 flex-col items-center justify-center text-black dark:bg-white dark:text-stone-700 shadow-lg shadow-slate-300'>
      
      <h2 className='text-center text-xl font-extrabold text-semibold text-stone-700'>
          404 Page Not Found
      </h2>

      <Link to={"/dashboard"} className='opacity-60 items-center justify-center text-xl text-semibold absolute left-48 top-24 w-18 h-10 mt-10 ml-15 flex transition ease-linear delay-100 rounded-lg shadow-lg outline-none focus:ring-stone-400 bg-stone-500 text-white dark:bg-blue-600 dark:text-amber-200 dark:focus:ring-slate-300 hover:opacity-90'>
          Back To Home  
      </Link>
    </div>
  );
}

export default NotFound;