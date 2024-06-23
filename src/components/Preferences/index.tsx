import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { UserPreferences, updateUserPreferences } from '../../context/user/actions';
import { Sport } from '../../types/sports';

const Settings = () => {
  const sports_sel:string[] = [];
  const team_sel:string[] = [];

  const set_pref:UserPreferences = {
    SelectedSports: sports_sel,
    SelectedTeams: team_sel
  }

  const teams = [
    {
      "id": 1,
      "name": "Thunderbolts",
    },
    {
      "id": 2,
      "name": "Dragonslayers",
    },
    {
      "id": 3,
      "name": "Phoenix Rising",
    },
    {
      "id": 4,
      "name": "Avalanche",
    },
    {
      "id": 5,
      "name": "Titans",
    },
    {
      "id": 6,
      "name": "Vortex Vipers",
    },
    {
      "id": 7,
      "name": "Spectral Shadows",
    },
    {
      "id": 8,
      "name": "Blitzkrieg",
    },
    {
      "id": 9,
      "name": "Fury United",
    },
    {
      "id": 10,
      "name": "Lightning Strikes",
    },
    {
      "id": 11,
      "name": "Serpents of Fire",
    },
    {
      "id": 12,
      "name": "Galaxy Warriors",
    },
    {
      "id": 13,
      "name": "Stormbreakers",
    },
    {
      "id": 14,
      "name": "Enigma Enforcers",
    },
    {
      "id": 15,
      "name": "Blaze Squadron",
    },
    {
      "id": 16,
      "name": "Phantom Phantoms",
    },
    {
      "id": 17,
      "name": "Celestial Chargers",
    },
    {
      "id": 18,
      "name": "Rebel Renegades",
    },
    {
      "id": 19,
      "name": "Inferno Ignitors",
    },
    {
      "id": 20,
      "name": "Stealth Strikers",
    },
    {
      "id": 21,
      "name": "Nova Knights",
    },
    {
      "id": 22,
      "name": "Crimson Crushers",
    },
    {
      "id": 23,
      "name": "Rapid Raptors",
    },
    {
      "id": 24,
      "name": "Shadow Assassins",
    }
  ]

  const sports = [
    {
      "id": 1,
      "name": "Basketball"
    },
    {
      "id": 2,
      "name": "American Football"
    },
    {
      "id": 3,
      "name": "Rugby"
    },
    {
      "id": 4,
      "name": "Field Hockey"
    },
    {
      "id": 5,
      "name": "Table Tennis"
    },
    {
      "id": 6,
      "name": "Cricket"
    }
  ];

  const [isOpen,setIsOpen] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {
    updateUserPreferences(set_pref);
    setIsLoading(false);
  },[isLoading]);

  const handleChange = (sport_item:Sport) => {
    if(sports_sel.includes(sport_item.name)){
      //remove
      sports_sel.splice(sports_sel.indexOf(sport_item.name),1);
    }
    else{
      sports_sel.push(sport_item.name);
    }
  }

  const handleTeamChange = (team_item:Sport) => {
    if(sports_sel.includes(team_item.name)){
      //remove
      sports_sel.splice(sports_sel.indexOf(team_item.name),1);
    }
    else{
      sports_sel.push(team_item.name);
    }
  }

  if(isLoading){
    return(
      <span className='absolute top-1/3 left-1/3 text-xl font-semibold'>
        <p>Loading...</p>
        <progress value={10} className='transition ease-linear' />
      </span>
    )
  }

  return (
    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                Preferences
              </DialogTitle>
              <hr className='text-stone-900 mr-2 ml-2 p-1 h-2'/>
              
              <div className='flex-wrap w-full h-1/3 items-center justify-between'>
                <h2 className='text-xl text-black'>
                  Favourite Sports
                </h2>
                  {sports.map((sport) => (
                    <span className='w-8'>
                      <label htmlFor='team' className='text-base text-black'>
                        {sport.name}
                      </label>
                      <input 
                        id='sport'
                        type='checkbox' 
                        checked={false}
                        onClick={() => handleChange(sport)} 
                        className='transition ease-in w-4 h-4 
                        outline-none focus:outline-blue'
                      />  
                    </span>
                  ))}
              </div>

              <div className='flex-wrap w-full h-1/3 items-center justify-between'>
                <h2 className='text-xl text-black'>
                  Favourite Teams
                </h2>
                  {teams.map((team) => (
                    <span className='w-8'>
                      <label htmlFor='team' className='text-base text-black'>
                        {team.name}
                      </label>
                      <input 
                        id='sport'
                        type='checkbox' 
                        checked={false}
                        onClick={() => handleTeamChange(team)} 
                        className='transition ease-in w-4 h-4 
                        outline-none focus:outline-blue'
                      />  
                    </span>
                  ))}
              </div>
              
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-blue-500 hover:bg-blue-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-stone-400/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={setIsLoading(true)}
                >
                  Save
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
  )
}

export default Settings;