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
import { Link } from "react-router-dom";
import { Match } from "../../context/matches/types";
import RefreshButton from "./Refresh";
import { toast } from "react-toastify";

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
      let ans1 = preferences.preferences.selectedTeams.includes(
        match.teams[0].name || match.teams[1].name
      );
      let ans2 =
        match.teams.length > 1
          ? preferences.preferences.selectedTeams.includes(match.teams[1].name)
          : false;
      let ans3 = preferences.preferences.selectedSports.includes(
        match.sportName
      );
      return ans1 || ans2 || ans3;
    });
  } else {
    filteredMatches = matches.filter((match: any) => {
      return match.sportName === selectedCategory;
    });
  }

  filteredMatches = filteredMatches.map((match: any) => {
    return { ...match, key: match.id };
  });
  if (matches.length === 0 && isLoading) {
    return (
      <span className="flex-col items-center">
        <p className="font-medium text-black">Loading...</p>
        <progress value={10} />
      </span>
    )
  }

  if (isError) {
    return toast.error(errorMessage??"Internal Server Error",{
      position: 'top-right',
      progress: undefined,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      delay: 5000,
      theme: 'colored',
      autoClose: 5000
    });
  }

  const [loading,setLoading] = useState(false);

  const handleRefresh = () => {

		//Set loading true and then false after 2s delay..
		setLoading(true);

		//Simulate a 2s delay...
		setTimeout(() => {
			setLoading(false);
		}, 2000);

	}

  return (
    <div className="container mx-auto">
      <div className="flex justify-end w-11/12 mx-auto my-2">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="justify-between px-5 text-slate-800 bg-slate-400 rounded-lg"
        >
          {categories.map((category) => (
            <option
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={
                category === selectedCategory
                  ? "active transition ease-linear font-medium bg-slate-500 dark:bg-blue-500 p-2 rounded-md hover:bg-blue-400"
                  : "p-2 rounded-md transition ease-linear font-medium hover:bg-gray-400 dark:hover:bg-blue-400"
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
              <div className="flex flex-col" key={match.id}>
                <div className="border-2 mx-2 mb-1 rounded-lg p-2 bg-zinc-200 flex-auto flex-col flex-wrap">
                  <div className=" flex justify-between w-48">
                    <h3 className="font-bold text-black-800">{match.name}</h3>
                    <RefreshButton onClick={() => handleRefresh()} isLoading={loading}/>
                  </div>
                  <p className="text-sm text-gray-600">
                    {match.location}
                  </p>
                  <p className="text-sm text-gray-600">
                    Date: {match.endsAt.slice(0, 10)}
                  </p>
                  <div className="flex flex-row justify-left">
                    <Link
                      to={
                        authenticated
                          ? `/account/matches/${match.id}`
                          : `/view/matches/${match.id}`
                      }
                    >
                      <button className="flex-col rounded-lg items-center px-2 py-1 text-center 
                      text-white bg-blue-400 hover:bg-blue-600">
                        Read More
                      </button>
                    </Link>
                    <Link
                      to={
                        authenticated
                          ? `/account/matches/${match.id}`
                          : `/view/matches/score/${match.id}`
                      }
                    >
                      <button className="flex-col rounded-lg items-center px-2 py-1 text-center 
                      text-white bg-blue-400 hover:bg-blue-600">
                        View Score
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
