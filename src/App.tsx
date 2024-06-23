import { RouterProvider } from "react-router-dom";
import Router from "./routes";
import { Suspense } from "react";
import { UserProvider } from "./context/user/context";
import { MatchProvider } from "./context/matches/context";
import { TeamProvider } from "./context/teams/context";
import { SportProvider } from "./context/sport/context";
import { NewsProvider } from "./context/news/context";
import React from "react";

const App = () => {
  return (
    <div
      className={`mx-auto h-screen flex flex-col px-4py-2 `}
    >
      <UserProvider>        
        <MatchProvider>
          <TeamProvider>
            <SportProvider>
              <NewsProvider>
                <Suspense fallback={<>Loading...</>}>
                  <RouterProvider router={Router} />
                </Suspense>
              </NewsProvider>
            </SportProvider>
          </TeamProvider>
        </MatchProvider>
      </UserProvider>
    </div>
  );
};
export default App;
