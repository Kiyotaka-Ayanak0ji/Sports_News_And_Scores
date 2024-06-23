import { useEffect } from "react";
import { fetchNews } from "../../context/news/actions.ts";
import { useNewsDispatch } from "../../context/news/context.tsx";
import ErrorBoundary from '../ErrorBoundary.tsx'
import { Suspense } from 'react'
import ArticleList from "./ArticleList.tsx";
import Favourites from "./Favourites.tsx";
import React from "react";

const Articles:React.FC = () => {
  const dispatch = useNewsDispatch();

  useEffect(() => {
    fetchNews(dispatch);
    console.log("articleDispatch: ", dispatch)
  }, [dispatch]);

  return (
    <div className="container flex w-full h-full items-center justify-center">
      <div className="mt-2 mx-auto w-10/12  bg-slate-400 shadow-lg shadow-slate-500 h-full justify-between flex items-center">
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <h1 className='text-black text-xl font-semibold'>
              Trending News
            </h1>
            <ArticleList />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="mt-2 mx-auto w-2/12 flex-col bg-neutral-500 dark:bg-slate-300 shadow-lg shadow-stone-500 h-full justify-center flex items-center">
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <h3 className='text-stone-700 text-xl font-semibold'>
                Favourites
            </h3>
            <Favourites />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default Articles;