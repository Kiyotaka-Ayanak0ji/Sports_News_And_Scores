import React from 'react';
import SigninForm from './Signin'

const Signin:React.FC = () => {
  return (
    <div className='w-64 h-32 bg-white 
    items-center justify-center mt-2'>
        <SigninForm/>
    </div>
  )
}

export default Signin;
