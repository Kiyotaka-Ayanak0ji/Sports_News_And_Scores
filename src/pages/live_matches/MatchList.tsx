import React, { useEffect, useState } from 'react'
import { fetchMatches } from '../../context/matches/actions'
import { useMatchDispatch } from '../../context/matches/context';
import { Data, UserPreferences, fetchPreferences } from '../../context/user/actions';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { Match } from '../../types/matches';
import { isAuth } from '../dashboard/Settings';
import MatchCard from './MatchCard';
import { MatchState } from '../../context/matches/reducer';


const MatchList:React.FC = () => {
    
    const [isLoading,setIsLoading] = useState(false);
    
    const matchDispatch = useMatchDispatch();
    let matches;
    
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
        data = fetchPreferences();
    }
    catch(error){
        toast.error("Problem fetching preferences !",{
            pauseOnHover: false,
            theme: "colored",
            delay: 5000,
            transition: Bounce,
            hideProgressBar: false,
            pauseOnFocusLoss: true,
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true
        });
        console.log(error);
    }
    
    if(data.errors?.length !== 0){
        toast.error(data.errors,{
            pauseOnHover: false,
            theme: "colored",
            delay: 5000,
            transition: Bounce,
            hideProgressBar: false,
            pauseOnFocusLoss: true,
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true
        });
        console.log(data.errors);
    }

    const [ matchList,setMatchList ] = useState<MatchState>();
    
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
            filter(matches,info.preferences);
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

            <div className='w-auto mx-auto flex-row justify-between container outline-none mt-2 gap-2'>
                {!isLoading && matchList?.matches.map((match) => {
                        return <MatchCard id={match.id}/>
                    })
                }
            </div>

        </div>
    )
}

export default MatchList;