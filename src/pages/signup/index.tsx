import React from 'react'
import SignupForm from '../signup/Signup'

const Signup = () => {
  return (
    <div className='w-64 flex items-center justify-center bg-cyan-100 rounded-lg 
      shadow-lg shadow-slate-400 outline-none dark:bg-zinc-600 '>
        <SignupForm />
    </div>
  )
}

export default Signup