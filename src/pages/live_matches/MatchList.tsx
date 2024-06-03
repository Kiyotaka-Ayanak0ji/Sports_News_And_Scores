import React, { useEffect, useState } from 'react'
import { fetchMatches } from '../../context/matches/actions'
import { useMatchDispatch, useMatchState } from '../../context/matches/context';
import { fetchPreferences } from '../../context/user/actions';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { Match } from '../../types/matches';
import { isAuth } from '../dashboard/Settings';
import MatchCard from './MatchCard';

interface UserPreferences {
    SelectedSports: string[]
    SelectedTeams: string[]
}

interface Data {
    preferences: UserPreferences,
    errors? : string
}

const MatchList:React.FC = () => {
    
    let state = useMatchState();

    const [isLoading,setIsLoading] = useState(false);
    
    const matchDispatch = useMatchDispatch();
    let matches:Match[] = [];
    
    if(isAuth){
        try{
            setIsLoading(true);
            matches = fetchMatches(matchDispatch);
        }
        catch(error){
            console.error(error);
            toast.error("Failed to retrieve matches!")
        }
    }
    let data;

    try{
        data:Data = fetchPreferences();
    }
    catch(error){
        toast.error("Problem fetching preferences !");
        console.log(error);
    }
    
    if(data.errors?.length !== 0){
        toast.error(data.errors);
        console.log(data.errors);
    }

    const [ matchList,setMatchList ] = useState(matches);
    
    let filteredMatches;

    const filter = (matches:Match[],preferences: UserPreferences) => {
        if(Object.keys(preferences).length !== 0){
            const { SelectedSports ,SelectedTeams } = preferences;
            
            filteredMatches = matches.filter((match) => {
                return SelectedSports.includes(match.sportName) && 
                match.teams.some((team) => SelectedTeams.includes(team.name));
            });
        } 
        //set to fitered matches...
        setMatchList(filteredMatches);
    }
    
    useEffect(() => {

        setIsLoading(true);
        try{
            const info:Data = fetchPreferences();
            filter(matches,info?.preferences);
        }
        catch(error){
            toast.error("Failed to update matches..");
            console.error(error);
        }

    },[isLoading,matchList,isAuth]);


    return (
        <div className='container flex'>
            
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss={false}
                rtl={false}
                draggable
                theme={"colored"}
                transition = {Bounce}
            />

            <div className='flex-row justify-between container outline-none mt-2 gap-2'>
                {!isLoading && matchList.map((match:Match) => {
                        return <MatchCard id={match.id}/>
                    })
                }
            </div>

        </div>
    )
}

export default MatchList;