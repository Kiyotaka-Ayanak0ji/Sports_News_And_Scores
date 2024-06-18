import {
  useMatchesState,
  useMatchesDispatch,
} from "../../context/matches/context";
import { fetchMatches } from "../../context/matches/action";
import {
  usePreferencesState,
  usePreferencesDispatch,
} from "../../context/preferences/context";
import { fetchPreferences } from "../../context/preferences/action";
import { useEffect, useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Match } from "../../context/matches/types";

export default function LiveMatchList() {
  const matchDispatch = useMatchesDispatch();
  useEffect(() => {
    fetchMatches(matchDispatch);
  }, [matchDispatch]);
  const state = useMatchesState();
  const { matches, isLoading, isError, errorMessage } = state;

  const preferenceDispatch = usePreferencesDispatch();
  useEffect(() => {
    fetchPreferences(preferenceDispatch);
  }, [preferenceDispatch]);
  const preferencesState = usePreferencesState();
  const { preferences } = preferencesState;
  const [selectedCategory, setSelectedCategory] = useState("All");

  const authenticated = !!localStorage.getItem("authToken");
  if (authenticated) {
    var categories = [
      "All",
      "Prefered Matches",
      "Basketball",
      "American Football",
      "Rugby",
      "Field Hockey",
      "Table Tennis",
      "Cricket",
    ];
  } else {
    var categories = [
      "All",
      "Basketball",
      "American Football",
      "Rugby",
      "Field Hockey",
      "Table Tennis",
      "Cricket",
    ];
  }

  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };

  let filteredMatches;
  if (selectedCategory === "All") {
    filteredMatches = matches;
  } else if (selectedCategory === "Prefered Matches") {
    filteredMatches = matches.filter((match: Match) => {
      // console.log("preferences: ", preferences);
      let ans1 = preferences.preferences.selectedTeams.includes(
        match.teams[0].name || match.teams[1].name
      );
      let ans2 =
        match.teams.length > 1
          ? preferences.preferences.selectedTeams.includes(match.teams[1].name)
          : false;
      let ans3 = preferences.preferences.selectedSports.includes(match.sportName);
      return ans1 || ans2 || ans3;
      // || preferences.preferredSport.includes(match.sportName);
    });
  } else {
    filteredMatches = matches.filter((match: any) => {
      return match.sportName === selectedCategory;
    });
  }
  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }
  // console.log("matches: ", matches);

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-end w-11/12 mx-auto my-2">
        <select
          name=""
          id=""
          className="justify-between  px-5 text-orange-600 bg-grey-400 rounded-lg"
        >
          {categories.map((category) => (
            <option
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={
                category === selectedCategory
                  ? "active bg-slate-500 hover:bg-gray-400 dark:bg-blue-500 p-2 rounded-md"
                  : "p-2 rounded-md bg-slate-300 hover:bg-gray-400 dark:hover:bg-blue-400"
              }
            >
              {category}
            </option>
          ))}
        </select>
        <div className="bg-gray-300 rounded-lg mx-2 p-3 text-black-600">
          <FunnelIcon className="h-4 w-4" />
        </div>
      </div>
      <div className="flex flex-row overflow-x-auto w-full p-4 bg-gray-100">
        {filteredMatches.length === 0 && <span>No matches available</span>}
        <div className="flex flex-row">
          {filteredMatches.map((match: any) => {
            return (
              <div className="flex flex-col">
              <div className="border-2 mx-2 mb-1 rounded border-red-400 p-2 bg-red-100 flex-auto flex-col flex-wrap">
                  <div className=" flex justify-between w-48">
                    <h3 className="font-bold text-black-800">{match.name}</h3>
                    <ArrowPathIcon
                      className="h-6 w-6 hover:rotate-90 transition-all ease-in-out"
                      aria-hidden="true"
                    />
                  </div>  
                  <p className="text-sm text-gray-600">{match.location}</p>
                  <p className="text-sm text-gray-600">
                    Date: {match.endsAt.slice(0, 10)}
                  </p>
                  <div className="flex flex-row justify-left">
              <Link to={`/account/matches/${match.id}`}>
                <p className="flex-col items-center px-1 py-1 text-red-500 hover:text-red-600">
                  Read more
                </p>
              </Link>
              <Link to={`/account/matches/score/${match.id}`}>
                <p className="flex-col items-center px-2 py-1 text-red-500 hover:text-red-600">
                  View Score
                </p>
              </Link>
              </div>
                   
                   
                  {/* 
                  <div className='flex flex-col my-2'>
                    <div className='flex justify-between mt-1 px-2'>
                      <p className='font-semibold'>{match.teams[0].name}</p>
                      <p className='font-semibold'>{match.score[match.teams[0].name]}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p className='font-semibold'>{match.teams[1].name}</p>
                      <p className='font-semibold'>{match.score[match.teams[1].name]}</p>
                    </div>
                  </div> */}
                  
              </div>
              
              </div>
              
            );
          })}
          
        </div>
      </div>
    </div>
  );
}
