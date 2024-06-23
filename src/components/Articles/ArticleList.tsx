import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useNewsDispatch } from '../../context/news/context';
import { fetchNews } from '../../context/news/actions';
import { News } from '../../types/articles';
import { CiFilter } from 'react-icons/ci'
import Article from './Article';
import { useEffect, useState } from 'react';

async function ArticleList(){
  
  const dispatch = useNewsDispatch();
  const nws:News[] = await fetchNews(dispatch);

  let filtered:News[] = nws;

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
    filtered = nws.filter((item) => item.sport.name === filterInput)
  }

  useEffect(()=>{
    if(filterInput !== ""){
      filter(filterInput);
    }
  },[filterInput]);


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
                  <MenuItem 
                    className="transition ease-linear group flex w-full items-center 
                    gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <span onClick={() => setFilterInput(sport_name)}>{sport_name}</span>
                  </MenuItem>
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

const render = () => {
  return (
    <>
      <ArticleList/>
    </>
  );
}

export default render;