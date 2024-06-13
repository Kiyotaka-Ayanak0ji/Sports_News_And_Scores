import React, { useEffect, Suspense } from "react";
const ListNews = React.lazy(() => import("./ListNews"));
import { Outlet } from "react-router-dom";
import { useNewsDispatch } from "../../context/news/context";
import { fetchNews } from "../../context/news/actions";
import { fetchSports } from "../../context/sport/actions";
import { useSportsDispatch } from "../../context/sport/context";
import { useTeamDispatch } from "../../context/teams/context";
import { fetchTeams } from "../../context/teams/actions";
import ErrorBoundary from "../../ErrorBoundary";

export default function NewsContainer() {
  
  const newsDispatch = useNewsDispatch();
  const sportDispatch = useSportsDispatch();
  const teamDispatch = useTeamDispatch();

  useEffect(() => {
    fetchNews(newsDispatch);
    fetchSports(sportDispatch);
    fetchTeams(teamDispatch);
  }, []);

  return (
    <div className="mt-4 relative">
      <h1 className="text-xl font-bold text-gray-900 dark:text-zinc-600 my-2">
        Treading News
      </h1>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <ListNews />
        </Suspense>
        <Outlet />
      </ErrorBoundary>
    </div>
  );
}
