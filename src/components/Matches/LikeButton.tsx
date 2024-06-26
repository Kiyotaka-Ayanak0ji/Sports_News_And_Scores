import { HeartIcon } from "@heroicons/react/24/outline";
import React from "react";

interface Props{
    clicked: boolean;
    onClick: () => void
}

const LikeButton:React.FC<Props> = ({onClick,clicked}) => {
    return (
        <button
            onClick={() => {
                onClick();
                clicked = !clicked 
            } }
        >
            {clicked ? (
                <HeartIcon color="red" className="outline-black h-8 w-8"/>       
            ):(
                <HeartIcon color="white" className="outline-black h-8 w-8"/>
            )}
        </button>
    )
}

export default LikeButton;