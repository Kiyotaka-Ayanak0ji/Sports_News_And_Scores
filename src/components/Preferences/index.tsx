import { useSportState } from "../../context/sports/context";
import { useTeamsState } from "../../context/teams/context";
import {  Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { usePreferencesDispatch, usePreferencesState } from "../../context/preferences/context";
import {  setPreferences } from "../../context/preferences/action";
import  { useEffect } from "react";
import { fetchPreferences } from "../../context/preferences/action";
import { fetchSports } from "../../context/sports/action";
import { fetchTeams } from "../../context/teams/action";
import { useSportDispatch } from "../../context/sports/context";
import { useTeamsDispatch } from "../../context/teams/context";
import { UserPreferences, initialPreferencesState } from "../../context/preferences/types";

export default function Preferences() {
  const navigate = useNavigate();
  const preferenceDispatch = usePreferencesDispatch();
  useEffect(() => {
    fetchPreferences(preferenceDispatch);
  }, [preferenceDispatch]);

  const sportsDispatch = useSportDispatch();
  useEffect(() => {
    fetchSports(sportsDispatch);
  }, [sportsDispatch]);

  const teamsDispatch = useTeamsDispatch();
  useEffect(() => {
    fetchTeams(teamsDispatch);
  }, [teamsDispatch]);

  const sportsList = useSportState();
  const { sports} = sportsList;
  // console.log("sports after: ",sports)
  const teamsList = useTeamsState();
  const { teams } = teamsList;
  const prefs = usePreferencesState();
  const { preferences } = prefs;

  const [, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
    navigate("../")
  }

  let [sportsState, setSportsState] = useState<any>([])

  let [teamsState, setTeamsState] = useState<any>([])

  let [userPreferences, setUserPreferences] = useState<UserPreferences>(initialPreferencesState.preferences)

  const preferencesDispatch = usePreferencesDispatch();
  // console.log("preferences: ",preferences)
  // console.log("sports after after: ",sports)  
  if(sports.length>0 && sportsState.length===0){
    setSportsState(sports)
  }

  if(teams.length>0 && teamsState.length===0){
    setTeamsState(teams)
  }

  useEffect(()=>{
    setUserPreferences(preferences)
  },[preferences])

  // console.log("sportsState: ",sportsState)
  // console.log("teamsState: ",teamsState)

  if(userPreferences===null && sportsState.length>0 && teamsState.length>0){
    setUserPreferences(preferences)
  }
  // console.log("userPreferences: ",userPreferences)

  const handleSportChange = async (e: any) => {
    let sport = e.target.value
    let newPreferences = userPreferences
    if(e.target.checked){
      newPreferences.preferences.selectedSports.push(sport)
    }else{
      newPreferences.preferences.selectedSports = newPreferences.preferences.selectedSports.filter((item: string) => item !== sport)
    }
    setUserPreferences(newPreferences)
    setPreferences(preferencesDispatch, userPreferences)
  }

  const handleTeamChange = async (e: any) => {

    let team = e.target.value
    let newPreferences = userPreferences
    if(e.target.checked){
      newPreferences.preferences.selectedTeams.push(team)
    }else{
      newPreferences.preferences.selectedTeams = newPreferences.preferences.selectedTeams.filter((item: string) => item !== team)
    }
    setUserPreferences(newPreferences)
    setPreferences(preferencesDispatch, userPreferences)
  }

  const handleSubmit = () => {
    setPreferences(preferencesDispatch, userPreferences)
    closeModal()
  }

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          {/* <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span> */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Preferences
              </Dialog.Title>
              <div className="mt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Sports
                    </h3>
                    <div className="mt-2">
                      {sportsState.map((sport: any) => (
                        <div key={sport.id} className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id={sport.name}
                              name={sport.name}
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              onChange={handleSportChange}
                              value={sport.name}
                              checked={userPreferences.preferences.selectedSports.includes(sport.name)}
                            />
                          </div>
                          < div className="ml-3 text-sm">
                            <label htmlFor={sport.name} className="font-medium text-gray-700">
                              {sport.name}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Teams
                    </h3>
                    <div className="mt-2">
                      {teamsState.map((team: any) => (
                        <div key={team.id} className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id={team.name}
                              name={team.name}
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              onChange={handleTeamChange}
                              value={team.name}
                              checked={userPreferences.preferences.selectedTeams.includes(team.name)}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor={team.name} className="font-medium text-gray-700">
                              {team.name}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
