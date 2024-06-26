import { useEffect } from "react";
import { useArticlesDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/action";
import ErrorBoundary from '../ErrorBoundary'
import { Suspense } from 'react'
import ArticleList from "./ArticleList.tsx";

export default function Articles() {
  const articleDispatch = useArticlesDispatch();

  useEffect(() => {
    fetchArticles(articleDispatch);
  }, [articleDispatch]);

  return (
    <div>
      <br />
      <div className="w-full flex flex-auto">
        <h1 className="text-gray-900 font-bold mb-2 mt-2 mx-2 text-2xl">
          Articles
        </h1>
      </div>
      <div className="mt-2 flex-row gap-2 w-full">
        <ErrorBoundary>
            <Suspense fallback={
                <div className="flex items-center justify-center">
                  <p className="text-center justify-center">
                    Loading...
                  </p>
                  <progress className="transition ease-linear" value={10} aria-busy={true} />
                </div>
              }
            >
              <ArticleList />
            </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

