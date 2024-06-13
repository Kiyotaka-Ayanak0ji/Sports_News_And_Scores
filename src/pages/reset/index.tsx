import React from 'react'
const ResetForm = React.lazy(() => import('./Reset'));

export const Reset = () => {
  return (
    <div className='items-center justify-center shadow-stone-400 shadow-lg max-w-lg'>
        <ResetForm/>
    </div>
  )
}