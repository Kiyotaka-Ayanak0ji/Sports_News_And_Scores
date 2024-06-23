import { fetchMatches } from '../../context/matches/actions'
import { useMatchDispatch } from '../../context/matches/context';
import { Match } from '../../types/matches';
import { Data, fetchPreferences } from '../../context/user/actions';
import MatchCard from './Match';

const MatchList:React.FC = async() => {
  
  const dispatch = useMatchDispatch();
  
  let matches:Match[] = await fetchMatches(dispatch);

  const preferences:Data = await fetchPreferences();

  matches = matches.filter((match) => {
    return (
      preferences?.preferences.SelectedSports.includes(match.sportName)
      || 
      match.teams.some((team) => 
        preferences?.preferences.SelectedTeams.includes(team.name)
      )
    );
  });

  return (
    <div className='flex-row mt-2 mb-2 gap-2 justify-between'>
      {matches?.map((match:Match) => (
        <MatchCard 
          id={match.id} 
          title={match.name} 
          location={match.location} 
          score={match.score} 
          teams={match.teams}
        />
      ))}      
    </div>
  )
}

export default MatchList;