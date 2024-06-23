import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useNewsDispatch, useNewsState } from '../../context/news/context';
import { fetchNews } from '../../context/news/actions';
import { News } from '../../types/articles';
import { CiFilter } from 'react-icons/ci'
import Article from './Article';
import { useEffect, useState } from 'react';
import React from 'react';
import { toast } from 'react-toastify';

const ArticleList:React.FC = () => {
  
  const {news , isLoading , isError , errorMessage} = useNewsState();
  
  let filtered:News[] = news;

  const filterSports = [
    'Basketball',
    'FootBall',
    'Cricket',
    'Rugby',
    'American Football',
    'Table Tennis',
    'Feild Hockey'
  ];

  const [filterInput,setFilterInput] = useState<string>("");

  const filter = (filterInput:string) => {
    filtered = filtered.filter((item) => item.sport.name === filterInput)
  }

  useEffect(()=>{
    const dispatch = useNewsDispatch();
    fetchNews(dispatch);

    const { news } = useNewsState();
    filtered = news;
  },[]);

  useEffect(() => {
    if(filterInput !== ""){
      filter(filterInput);
    }
  },[filterInput])

  if(isLoading){
    return(
      <div className='flex items-center justify-center w-1/2 h-1/2'>
        <p className='flex text-base'>
          Loading...
        </p>
        <progress className='flex-1 aboulute top-1/3 left-1/3' value={10} />
      </div>
    )
  }

  if(isError){
    toast.error(errorMessage,{
      pauseOnHover: false,
      theme: "colored",
      delay: 5000,
      progress: undefined,
      hideProgressBar: false,
      pauseOnFocusLoss: true,
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true
    })
  }

  return (
    <>
      <div className='container flex'>
        <div className='flex w-full h-1/3'>
          <Menu>
            
            <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
              Filter
              <ChevronDownIcon className="size-4 fill-white/60" />
            </MenuButton>

            <Transition
              enter="transition ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
              >
                {filterSports.map((sport_name) => (
                  <div 
                    onClick={() => setFilterInput(sport_name)}
                    className="p-1 transition ease-linear group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <MenuItem >
                      <span className='text-base font-semibold text-stone-900 p-2'>
                        {sport_name}
                      </span>
                    </MenuItem>
                  </div>
                ))};
              </MenuItems>
            </Transition>
          </Menu>

          <CiFilter 
            size={20} 
            color='black'
            onClick={() => filter(filterInput)} 
            className='absolute right-0 flex p-2 mb-2'
          />

        </div>
        <div className='w-full h-full shadow-lg shadow-slate-500 flex-col items-center overflow-y-scroll'>
          {filtered.map((news) => (
            <Article title={news.title} content={news.content} summary={news.summary} thumbnail={news.thumbnail} date={news.date} sport={news.sport} />
          ))}
        </div>
      </div>
    </>
  )
}

export default ArticleList;