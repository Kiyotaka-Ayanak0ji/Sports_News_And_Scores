import { useMatchState } from '../../context/matches/context';
import { Match } from '../../types/matches';
import MatchCard from './Match';
import React from 'react';
import { useUserState } from '../../context/user/context';
import { toast } from 'react-toastify';

const MatchList:React.FC = () => {

  const {matches, isLoading, isError ,errorMessage} = useMatchState();
  const { user } = useUserState();

  let filtered = matches.filter((match) => {
    return (
      user.user.preferences.SelectedSports.includes(match.sportName)
      || 
      match.teams.some((team) => 
        user.user.preferences.SelectedTeams.includes(team.name)
      )
    );
  });

  if(isLoading){
    return(
      <div className='flex items-center justify-center w-1/2 h-1/2'>
        <p className='flex text-neutral-500 text-base'>
          Loading...
        </p>
        <progress className='flex-1 aboulute top-1/3 left-1/3' value={10} />
      </div>
    )
  }

  if(isError){
    toast.error(errorMessage,{
      pauseOnHover: false,
            theme: "colored",
            delay: 5000,
            progress: undefined,
            hideProgressBar: false,
            pauseOnFocusLoss: true,
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true
    })
  }

  return (
    <div className='flex-row mt-2 mb-2 gap-2 justify-between'>
      {filtered.length === 0 ? (
        <div className='text-black'>
          <p className='items-center text-neutral-500'>
            Loading..
          </p>
          <progress value={10} aria-busy={true} />
        </div>
      ) : (
        filtered.map((match: Match) => (
          <MatchCard id={match.id} />
        ))
      )}  
    </div>
  )
}

export default MatchList;