import React from 'react';
import { Link } from 'react-router-dom';

const Notfound: React.FC = () => {
  return ( 
    <div>
      <h1 className='text-4xl font-bold text-center mt-8'>
        404 - Not Found
      </h1>
      <br />
      <p className='text-lg text-gray-600 text-center'>
        The page you are looking for does not exist.
      </p>
      <br />
      <div className='text-xl font-bold text-center mt-8'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' id="backToHomeButton">
          <Link to='/account'>Go Home</Link>
        </button>
      </div>
      
    </div>
  );
};
export default Notfound;