import React from "react"
import Signin from "./pages/signin"
import { RouterProvider } from "react-router-dom"
import router from "./router"

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
