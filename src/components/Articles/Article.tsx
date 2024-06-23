import { useEffect, useState } from 'react';
import { Button , Dialog,  DialogPanel, DialogTitle } from '@headlessui/react'
import { News } from '../../types/articles';
import React from 'react';


const Article:React.FC<Omit<News,'id'|'teams'>> = (props) => {
  
  const { title , thumbnail, content , date , summary , sport } = props; 
  
  const [isOpen,setIsOpen] = useState(false);
  
  const Modal:React.FC = () => {
    return(
      <Dialog onClose={() => setIsOpen(false)} open={isOpen} as="div" className="relative z-10 focus:outline-none">
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-xl text-black">
                {title}
              </DialogTitle>
              <div className='flex w-full h-4/5'>
                <img src={thumbnail} alt='bad-img' className='ml-3 mr-3 h-20 w-11/12 rounded-md lg:rounded-none'/>
                <p className="flex mt-2 text-sm/6 text-white/50">
                  {content}
                </p>
              </div>
              <div className="mt-4 items-center justify-center">
                <Button
                  className="flex-end absolute right-0 items-center rounded-md bg-blue-500 hover:bg-blue-600 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    )
  }
  
  const getFormattedDate = (date:string) => {
    let result = "";

    //YYYY-MM-DD
    const ref = date.slice(0,10);
    
    const mapping:Record<number,string> = {
      1:"Jan",
      2:"Feb",
      3:"Mar",
      4:"Apr",
      5:"May",
      6:"Jun",
      7:"Jul",
      8:"Aug",
      9:"Sep",
      10:"Oct",
      11:"Nov",
      12:"Dec"
    }

    const ind = Number(ref[5]+ref[6]);

    result = mapping[ind] + " " + (ref[8]+ref[9]) + ", " + ref.slice(0,4); 

    return result;
  }

  return (
    <>
      <div className='flex-row dark:bg-zinc-600 dark:text-cyan-300 text-neutral-500 bg-white shadow-lg shadow-slate-400'>
        <div className='mt-2 mb-2 w-11/12 h-40'>
          <h2 className='absolute left-0 flex text-lg font-bold text-black'>
            {title}
          </h2>
          <p className='flex absolute left-0 text-base text-slate-500'>
            {summary.substring(0,200)}
          </p>
          <p className='absolute left-0 flex font-light text-sm'>
            {sport.name}
            {getFormattedDate(date)}
          </p>
          <a
            onClick={() => setIsOpen(true)} 
            className='text-sm text-slate-400 hover:underline'>
            Read More...
          </a>
        </div>
        <div className='absolute right-0 h-auto w-auto'>
          <img src={thumbnail} alt='bad-img' className='h-14 w-10'/>
        </div>      
      </div>
      <Modal />
    </>
  )
}

export default Article;