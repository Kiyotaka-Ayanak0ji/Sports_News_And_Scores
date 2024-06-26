import { RouterProvider } from "react-router-dom";
import Router from "./routes";
import { Suspense } from "react";
import { MatchesProvider } from "./context/matches/context";
import { ArticlesProvider } from "./context/articles/context";
import { PreferencesProvider } from "./context/preferences/context";
import { SportProvider } from "./context/sports/context";
import { TeamsProvider } from "./context/teams/context";
import { ThemeProvider } from "./context/theme";

const App = () => {
  return (
    <div
      className={`mx-auto h-screen flex flex-col px-4py-2 `}
    >
      <ThemeProvider>
        <TeamsProvider>
          <SportProvider>
            <PreferencesProvider>
              <MatchesProvider>
                <ArticlesProvider>
                  <Suspense fallback={<>Loading...</>}>
                    <RouterProvider router={Router} />
                  </Suspense>
                </ArticlesProvider>
              </MatchesProvider>
            </PreferencesProvider>
          </SportProvider>
        </TeamsProvider>
      </ThemeProvider>
    </div>
  );
};
export default App;
