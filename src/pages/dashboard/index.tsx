import React from "react"
import Navbar from "./Navbar"
import ErrorBoundary from "../../ErrorBoundary";
import { Outlet } from "react-router-dom";

const Display:React.FC = () => {
    return(
        <ErrorBoundary>
            <Navbar/>
            <div className="flex items-center justify-center w-full">
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </ErrorBoundary>
    )
}

export default Display;