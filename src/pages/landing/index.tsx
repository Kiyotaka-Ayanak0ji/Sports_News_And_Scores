import { Outlet } from "react-router-dom"
import Landing from "./landing"

const ViewLayout = () => {

  return (
    <>
      <Landing />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default ViewLayout