import React, { useEffect, useState } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useTeamDispatch, useTeamState } from '../../context/teams/context'
import { useNewsDispatch, useNewsState } from '../../context/news/context';
import clsx from 'clsx';
import { Sport } from '../../types/sports';
import { Team } from '../../types/matches';
import { fetchPreferences } from '../../context/user/actions';
import { useUserState } from '../../context/user/context';
import { useSportDispatch, useSportState } from '../../context/sport/context'
import { fetchNews } from '../../context/news/actions';
import { fetchSports } from '../../context/sport/actions';
import { fetchTeams } from '../../context/teams/actions';

const Favourites:React.FC = () => {
    
    const {user , errors} = useUserState();
    let filtered,sports_list,teams_list,render;

    const dispatch_t = useTeamDispatch();
    const dispatch_s = useSportDispatch();
    const dispatch_n = useNewsDispatch();
 
    const [selectedSport,setSelectedSport] = useState("");
    const [selectedTeam,setSelectedTeam] = useState("");
    
    useEffect(() => {
        
        fetchNews(dispatch_n);
        fetchSports(dispatch_s);
        fetchTeams(dispatch_t);

        const {news} = useNewsState();
        const {teams} = useTeamState();
        const {sports} = useSportState();

        render = news;
        teams_list = teams;
        sports_list = sports;
    },[])

    useEffect(() => {
        fetchPreferences();
        
        //Filter by preferences...
        render = render.filter((item) => {
            return(
                item.teams.some((team) => user.preferences.SelectedTeams.includes(team.name))
                ||
                user.preferences.SelectedSports.includes(item.sport.name)
            );
        });

        filtered = render;

        if(selectedSport !== ""){

            filtered = filtered.filter((items) => {
                return items.sport.name === selectedSport;
            });
        }

        if (selectedTeam !== "") {
            filtered = filtered.filter((item) => {
                return item.teams.some((team) => {
                    return team.name === selectedTeam;
                });
            });
        }
    },[selectedSport,selectedTeam]);

    return (
        <>
            <div className='container flex'>
                <div className='container items-center justify-center w-full h-1/3'>
                    <Listbox 
                        value={selectedSport} 
                        onChange={() => setSelectedSport(selectedSport)}
                    >
                        <ListboxButton
                        className={clsx(
                            'relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                        )}
                        >
                        {selectedSport}
                        <ChevronDownIcon
                            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                            aria-hidden="true"
                        />
                        </ListboxButton>
                        <ListboxOptions
                        anchor="bottom"
                        transition
                        className={clsx(
                            'w-[var(--button-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                        )}
                        >
                        {sports_list.map((sport:Sport) => (
                            <ListboxOption
                            key={sport.id}
                            value={sport.name}
                            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                            >
                            <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                                <div className="text-sm/6 text-white">
                                    {sport.name}
                                </div>
                            </ListboxOption>
                        ))}
                        </ListboxOptions>
                    </Listbox>
                    <Listbox 
                    value={selectedTeam} 
                    onChange={() => setSelectedTeam(selectedTeam)}
                >
                    <ListboxButton
                    className={clsx(
                        'relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                    >
                    {selectedTeam}
                    <ChevronDownIcon
                        className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                        aria-hidden="true"
                    />
                    </ListboxButton>
                    <ListboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                        'w-[var(--button-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                        'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                    )}
                    >
                    {teams_list.map((team:Team) => (
                        <ListboxOption
                        key={team.id}
                        value={team.name}
                        className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                        >
                        <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                            <div className="text-sm/6 text-white">
                                {team.name}
                            </div>
                        </ListboxOption>
                    ))}
                    </ListboxOptions>
                </Listbox>
                </div>

                <div className='mt-2 container flex-col w-full h-full items-center justify-center gap-2'>
                    {filtered.map((item) => {
                        return (
                            <div className='flex-wrap w-full h-1/3 items-center justify-center bg-white dark:bg-stone-500 text-black dark:text-cyan-400'>
                                <h4 className='absolute left-0 text-xl font-bold text-black'>
                                    {item.title}
                                </h4>
                                <p className='absolute left-0 inline-flex'>
                                    {item.summary.substring(0,100)}
                                </p>
                                <button className='rounded-none absolute left-0 text-white shadow-inner dark:bg-blue-600 dark:shadow-cyan-300 bg-neutral-500 shadow-slate-600 text-base items-center justify-center flex-end'>
                                    Read More
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Favourites;