import React from 'react'
import { Link } from 'react-router-dom'

const NotFound:React.FC = () => {
  return (
    <div className='flex-col absolute top-24 left-1/4 w-1/2 h-2/3 rounded-lg items-center justify-center bg-stone-900 flex shadow-lg shadow-slate-300'>
        <h2 className='flex absolute top-10 text-3xl font-semibold text-neutral-400'>
            404 Page Not Found.
        </h2>
        <hr/>
        <Link to="/account"  
          className='p-5 w-30 items-center font-bold h-10 rounded-lg flex transition ease-in-out delay-200 shadow-lg outline-none mt-2 focus:ring-amber-200 bg-stone-500 dark:bg-blue-500 text-white dark:focus:ring-slate-300'>
            Back To Home  
        </Link>
    </div>
  );
}

export default NotFound;