import React from 'react';
import { Link } from 'react-router-dom';

const Notfound: React.FC = () => {
  return ( 
    <div className='container items-center top-1/3 left-1/3'>
      <h1 className='text-4xl text-stone-600 font-bold text-center mt-8'>
        404 - Not Found
      </h1>
      <br />
      
      <p className='text-lg text-black text-center'>
        The page you are looking for does not exist.
      </p>

      <hr className='p-1 w-full bg-stone-900 h-2'/>

      <div className='text-xl font-bold text-center mt-8'>
        <button className='bg-blue-500 text-center hover:bg-blue-700 transition ease-linear hover:ring-2 hover:ring-cyan-400 text-white font-bold py-2 px-4 rounded' id="backToHomeButton">
          <Link to='/account'>
            Go Home
          </Link>
        </button>
      </div>
      
    </div>
  );
};
export default Notfound;