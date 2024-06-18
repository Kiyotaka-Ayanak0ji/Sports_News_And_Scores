import { useEffect } from "react";
import { useArticlesDispatch } from "../../context/articles/context.tsx";
import { fetchArticles } from "../../context/articles/action.ts";
import ErrorBoundary from '../ErrorBoundary.tsx'
import { Suspense } from 'react'
import ArticleList from "./ArticleList.tsx";

export default function Articles() {
  const articleDispatch = useArticlesDispatch();

  useEffect(() => {
    fetchArticles(articleDispatch);
    console.log("articleDispatch: ", articleDispatch)
  }, [articleDispatch]);

  return (
    <div>
      <br />
      <div className="w-full flex flex-auto">
        <h1 className="text-gray-900 font-bold mb-2 mt-2 mx-2 text-2xl">Articles</h1>
      </div>
      <div className="mt-2 justify-between flex items-center w-full">
      <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <ArticleList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

