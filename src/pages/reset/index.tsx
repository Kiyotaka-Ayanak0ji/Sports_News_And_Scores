import React from 'react'
const ResetForm = React.lazy(() => import('./Reset'));

export const Reset = () => {
  return (
    <div className='absolute top-1/4 left-1/3 w-1/3 h-1/2 items-center justify-center shadow-stone-400 shadow-lg max-w-lg'>
        <ResetForm/>
    </div>
  )
}