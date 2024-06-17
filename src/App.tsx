import React from "react"
import { RouterProvider } from "react-router-dom"
import router from "./router"
import { UserProvider } from "./context/user/context"
import { NewsProvider } from "./context/news/context"
import { MatchProvider } from "./context/matches/context"
import { ToastContainer } from "react-toastify"
import { TeamProvider } from "./context/teams/context"
import { SportProvider } from "./context/sport/context"

function App() {
  return (
    <div className={`w-full mx-auto`}>
      <UserProvider>
        <NewsProvider>
          <MatchProvider>
            <TeamProvider>
              <SportProvider>
                <RouterProvider router={router} />
              </SportProvider>
            </TeamProvider>
          </MatchProvider>
        </NewsProvider>
      </UserProvider>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss={false}
        rtl={false}
        theme={"colored"}
      />
    </div>
  )
}

export default App
