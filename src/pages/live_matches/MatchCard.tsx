import React, { useEffect, useState } from 'react'
import { fetchMatch } from '../../context/matches/actions'
import { useMatchDispatch } from '../../context/matches/context'
import { Match } from '../../types/matches';
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';

function MatchCard(props){

    //Store id of matches..
    const [likedMatches,setLikedMatches] = useState<number[]>([]);
    
    const dispatch = useMatchDispatch();
    
    const match:Match = fetchMatch(dispatch,props.id);

    if(match.isRunning === false){
        return(<></>);
    }

    const handleLikes = (id: number) => {
        const likematch = localStorage.getItem("likeMatches");
            if (likematch) {
                const updateLikes = JSON.parse(likematch);
                if (updateLikes.includes(id)) {
                    const index = updateLikes.indexOf(id);
                    index > -1 ? updateLikes.splice(index, 1) : "";
                } else {
                    updateLikes.push(id);
                }
                localStorage.setItem("likeMatches", JSON.stringify(updateLikes));
                setLikedMatches(updateLikes);
            } else {
                localStorage.setItem("likeMatches", JSON.stringify([id]));
                setLikedMatches([id]);
            }
    }    
    const location = match.location.split(",");
    const place = location[location.length-1];

    const sub = match.name + "," + match.endsAt.slice(0,4) + "," + place;

    useEffect(() => {
        fetchMatch(dispatch,props.id);
        const likematch = localStorage.getItem("likeMatches");
        if (likematch) {
          setLikedMatches(JSON.parse(likematch));
        }
      }, [props.id]);

    return (
    <>
        {match.isRunning &&
            <div className="border-2 mx-2 mb-1 rounded border-gray-400 bg-gray-100 dark:bg-slate-700 p-2 dark:hover:bg-slate-600 hover:bg-gray-200">
                <div className=" flex justify-between w-48">
                    <h3 className="font-bold text-gray-800 dark:text-white">
                        {match.sportName}
                    </h3>
                    <div className="flex">
                        <button
                            className="mx-2 dark:text-white"
                            onClick={() => handleLikes(match.id)}
                        >
                            {likedMatches.includes(match.id) ? (
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 47.5 47.5"
                                id="heart"
                                className="h-6 w-6 text-red-500 duration-250 cursor-pointer"
                                >
                                <g
                                    clipPath="url(#a)"
                                    transform="matrix(1.25 0 0 -1.25 0 47.5)"
                                >
                                    <path
                                    fill="#dd2e44"
                                    d="M3.067 25.68c0 8.799 12.184 12.06 15.933 1.874 3.749 10.186 15.933 6.925 15.933-1.874C34.933 16.12 19 3.999 19 3.999S3.067 16.12 3.067 25.68"
                                    ></path>
                                </g>
                                </svg>
                            ) : (
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                id="heart"
                                className="h-6 w-6 dark:text-white"
                                >
                                <path d="M349.6 64c-36.4 0-70.718 16.742-93.6 43.947C233.117 80.742 198.8 64 162.4 64 97.918 64 48 114.221 48 179.095c0 79.516 70.718 143.348 177.836 241.694L256 448l30.164-27.211C393.281 322.442 464 258.61 464 179.095 464 114.221 414.082 64 349.6 64zm-80.764 329.257l-4.219 3.873-8.617 7.773-8.616-7.772-4.214-3.869c-50.418-46.282-93.961-86.254-122.746-121.994C92.467 236.555 80 208.128 80 179.095c0-22.865 8.422-43.931 23.715-59.316C118.957 104.445 139.798 96 162.4 96c26.134 0 51.97 12.167 69.11 32.545L256 157.661l24.489-29.116C297.63 108.167 323.465 96 349.6 96c22.603 0 43.443 8.445 58.686 23.778C423.578 135.164 432 156.229 432 179.095c0 29.033-12.467 57.459-40.422 92.171-28.784 35.74-72.325 75.709-122.742 121.991z"></path>
                                </svg>
                            )}
                        {/* Refresh button */}
                        </button>
                            <ArrowPathIcon
                            className="h-6 w-6 hover:rotate-90 transition-all ease-in-out"
                            aria-hidden="true"
                            onClick={() => {
                                fetchMatch(dispatch,match.id);
                            }}
                        />
                    </div>
            </div>
            <div className='w-12 h-6 container flex mt-1 mb-1 mr-0.5 ml-0.5'>
                <h3 className='font-semibold'>${match.sportName}</h3>
                <p>{sub}</p>

                <div className='relative flex-wrap mt-0.5 w-6 h-3'>
                    
                    <div className='flex-col flex'>
                        <h3 className='font-semibold'>
                            {match.teams[0].name}
                        </h3>
                        <h3 className='font-semibold'>
                            {match.score[match.teams[0].name]}
                        </h3>
                    </div>

                    <div className='flex justify-between'>
                        <h3 className='font-semibold'>
                            {match.teams[1].name}
                        </h3>
                        <h3 className='font-semibold'>
                            {match.score[match.teams[1].name]}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
        }
    </>
  );
}

export default MatchCard;