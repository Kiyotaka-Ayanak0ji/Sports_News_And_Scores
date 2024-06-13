import React from 'react'
import SigninForm from './Signin'
import ErrorBoundary from '../../components/ErrorBoundary';

export const Signin = () => {
  return (
    <ErrorBoundary>
      <div className='w-64 h-32 bg-white items-center justify-center mt-2'>
          <SigninForm/>
      </div>
    </ErrorBoundary>
  )
}

export default Signin;
