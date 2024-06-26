import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import React from "react";

interface Props{
    onClick: () => void;
    isLoading: boolean;
}

const RefreshButton:React.FC<Props> = ({onClick,isLoading}) => {
    return (
        <button
        onClick={onClick}
        disabled={isLoading}
        className={`flex w-14 h-10 items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold rounded transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
        {isLoading ? (
            <svg className="animate-spin h-6 w-6 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V1.8a10 10 0 00-8 15.2z"
            ></path>
            </svg>
        ) : (
            <ArrowPathIcon
                className="h-6 w-6 hover:rotate-90 transition-all ease-in-out"
                aria-hidden="true"
            />
        )}
        </button>
    );
};

export default RefreshButton;
