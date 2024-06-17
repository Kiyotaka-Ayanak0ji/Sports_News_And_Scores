import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSportsState } from '../../context/sport/context';
import { useTeamState } from '../../context/teams/context';
import { Team } from '../../types/matches';
import { Sport } from '../../types/sports';
import { toast } from 'react-toastify';
import { fetchPreferences } from '../../context/user/actions';

interface UserPreferences{
    SelectedSports: string[],
    SelectedTeams: string[]
}

interface Data {
    preferences: UserPreferences,
    errors?: string
}

export const isAuth = !!localStorage.getItem("authToken");

const Settings = () => {
    if(!isAuth){
        return (
            <>
            </>
        );
    }

    const navigate = useNavigate();
    
    const sports_state = useSportsState();
    const teams_state = useTeamState();

    let { sports,isSportsLoading } = sports_state;
    let { teams,isTeamLoading } = teams_state;

    const [preferences,setPreferences] = useState<UserPreferences>({
        SelectedSports: [],
        SelectedTeams: []
    });

    const [loading,setLoading] = useState(false);

    const [isOpen,setIsOpen] = useState(true);

    const open = () => {
        setIsOpen(true);
    }

    const close = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        setLoading(true);
        if(isAuth){
            fetchPreferences()
            .then((data: Data) => {
                if(Object.keys(data.preferences).length !== 0){
                    setPreferences(data.preferences);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Error in real-time preferences update !");
            });
        }
    },[isOpen]);

    return (
         <>
            <Button onClick={() => open()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </Button>

            <Transition appear show={isOpen}>
                <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close}>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                                <DialogPanel className="flex-row w-full shadow-xl shadow-stone-400 max-w-md rounded-xl bg-cyan-200 p-6 backdrop-blur-2xl">
                                {loading?(
                                        <progress value={10} aria-busy = {true}/>
                                    ):
                                    (
                                    <div aria-busy={false} className='flex items-center justify-center'>
                                        
                                        <DialogTitle as="h1" className="text-2xl leading-tight font-medium text-stone-900 dark:text-white">
                                            User Preferences
                                        </DialogTitle>

                                        <Button onClick={() => close()} className={'h-6 w-6'} aria-hidden={true}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </Button>
                                    
                                        <div className='mr-2 mt-2'>
                                            <h1 className='items-start text-xl'>
                                                Favourite Sports
                                            </h1>
                                            <hr/>

                                            <div className='flex flex-wrap'>
                                                {!isSportsLoading && sports.map((sport: Sport) => {
                                                    <div key={sport.id}
                                                        className='flex items-center justify-between w-64'
                                                    >
                                                        <label 
                                                            className='cursor-pointer'
                                                            htmlFor={sport.name}
                                                        >
                                                            {sport.name}
                                                        </label>
                                                         
                                                        <input 
                                                            id = {sport.name}
                                                            checked={preferences?.SelectedSports?.includes(sport.name)}
                                                            className='mx-auto h-6 w-4'
                                                            type='checkbox'
                                                            value={sport.name}
                                                            onChange={(event) => {
                                                                let arr = preferences.SelectedSports;
                                                                if(event.target.checked){
                                                                    arr.push(event.target.value);
                                                                }
                                                                else{
                                                                    //search in selected sports..
                                                                    
                                                                    const idx = arr.indexOf(
                                                                        event.target.value
                                                                    );
                                                                    //If the index is valid..
                                                                    if(idx > -1){
                                                                        arr.splice(idx,1);
                                                                    }
                                                                }
                                                                //update preferences...
                                                                setPreferences({
                                                                    ...preferences,
                                                                    SelectedSports: arr
                                                                })
                                                            }}
                                                        /> 
                                                    </div>
                                                })}
                                            </div>
                                            <hr/>
                                        </div>
                                        <div className='mr-2 mt-2'>
                                            <h2 className='items-start text-xl'>
                                                Favourite Teams
                                            </h2>
                                            <hr/>
                                            <div className='flex-wrap'>
                                                {!isTeamLoading && teams.map((team: Team) => {
                                                    <div key={team.id}
                                                        className='flex items-center justify-between w-64'
                                                    >
                                                        <label className='cursor-pointer'
                                                         htmlFor={team.name}
                                                         >
                                                            {team.name}
                                                         </label>

                                                        <input 
                                                            id = {team.name}
                                                            checked={preferences?.SelectedTeams?.includes(team.name)}
                                                            className='mx-auto h-6 w-4'
                                                            type='checkbox'
                                                            value={team.name}
                                                            onChange={(event) => {
                                                                let arr = preferences.SelectedTeams;
                                                                if(event.target.checked){
                                                                    arr.push(event.target.value);
                                                                }
                                                                else{
                                                                    //search in selected teams..
                                                                    
                                                                    const idx = arr.indexOf(
                                                                        event.target.value
                                                                    );
                                                                    //If the index is valid..
                                                                    if(idx > -1){
                                                                        arr.splice(idx,1);
                                                                    }
                                                                }
                                                                //update preferences...
                                                                setPreferences({
                                                                    ...preferences,
                                                                    SelectedTeams: arr
                                                                })
                                                            }}
                                                        />  
                                                    </div>
                                                })}
                                            </div>
                                            <hr/>
                                        </div>

                                        {/* Preferences are automatically updated */}
                                        
                                        <div className='items-end mt-3 flex'>
                                            <button 
                                                onClick={() => close()}
                                                className='transition delay-100 ease-in-out inline-flex rounded-md text-cyan-200 bg-stone-400 dark:bg-blue-400 dark:focus:bg-blue-600 focus:bg-stone-600 dark:text-white'
                                            >
                                                Close
                                            </button>
                                        </div> 
                                    </div>
                                    )
                                }
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>      
        </> 
    );      
}

export default Settings;