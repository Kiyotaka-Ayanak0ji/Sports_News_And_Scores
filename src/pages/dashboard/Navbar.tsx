import React, { Suspense, useEffect, useState } from 'react'
import { Bounce, ToastContainer } from 'react-toastify';
import Preferences, { isAuth } from './Settings';
import { fetchSports } from '../../context/sport/actions';
import { fetchTeams } from '../../context/teams/actions';
import { useSportsDispatch } from '../../context/sport/context';
import { useTeamDispatch } from '../../context/teams/context';
import Logo from '../../assets/logo.png';
import ErrorBoundary from '../../ErrorBoundary';
import MatchList from '../live_matches/MatchList';
import News from '../news';
import Favourites from '../news/Favourites';
const DarkMode = React.lazy(() => import("./DarkMode"));
const Profile = React.lazy(() => import('./Profile'));

const initialState = [{ name: "Sign out", href: "/logout" }];

const Navbar = () => {
    
    const [navigation,setUserNavigation] = useState(initialState);
    
    const sportsDispatch = useSportsDispatch();
    const teamsDispatch = useTeamDispatch();

    useEffect(() => {
        if (!isAuth) {
          setUserNavigation([
            { name: "Sign in", href: "/signin" },
            { name: "Sign up", href: "/signup" },
          ]);
        } else {
          setUserNavigation([
            { name: "Sign out", href: "/logout" },
            { name: "Change Password", href: "/reset" },
          ]);
        }
        fetchSports(sportsDispatch);
        fetchTeams(teamsDispatch);
      }, []);

    return (
    <>
        <div className='flex container'>
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss={false}
                rtl={false}
                draggable
                theme={"light"}
                transition = {Bounce}
            />
            <div className="relative flex-row bg-gray-400 dark:bg-stone-500 font-semibold text-black dark:text-white">
            
                <div className='absolute left-0'>
                    <ErrorBoundary>
                        <Suspense fallback={<div className='suspense-loading'><span>Loading...<br/><progress value={10} aria-busy={true}/></span></div>}>
                            <img src={Logo} aria-busy={false} className='items-center h-16 w-18'/>
                        </Suspense>
                    </ErrorBoundary> 
                </div>
        
                <div className='items-center justify-center'>
                    <h1 className='font-xl font-bold'>
                        Sports Center
                    </h1>
                </div>
        
                <div className='absolute right-0'>
                    <ErrorBoundary>
                        <Suspense fallback={<div className='suspense-loading'><span>Loading...<br/><progress value={10} aria-busy={true}/></span></div>}>
                            <Profile props={navigation} aria-busy={false}/>
                        </Suspense>
                    </ErrorBoundary>       
                </div>

                <div className='absolute right-0'>
                    <ErrorBoundary>
                        <Suspense fallback={<div className='suspense-loading'><span>Loading...<br/><progress value={10} aria-busy={true}/></span></div>}>
                            <Preferences aria-busy={false} />
                        </Suspense>
                    </ErrorBoundary>
                </div>

                <div className='absolute right-0'>
                    <ErrorBoundary>
                        <Suspense fallback={<div className='suspense-loading'><span>Loading...<br/><progress value={10} aria-busy={true}/></span></div>}>
                            <DarkMode aria-busy={false} />
                        </Suspense>
                    </ErrorBoundary> 
                </div>
                
            </div>
        </div>
        <hr className="bg-stone-900 h-1"/>
        <div className='flex justify-between bg-gray-400 dark:bg-zinc-500 shadow-lg shadow-stone-500'>
            <div className='flex-row justify-between gap-2'>
                <MatchList />
            </div>
            <div className = "relative max-w-screen-lg container flex justify-between shadow-lg shadow-slate-400 dark:bg-stone-500">
                <div className='flex items-start absolute left-0'>
                    <News/>
                </div>
                <div className='flex items-end justify-between absolute right-0 bg-stone-400 dark:bg-slate-400'>
                    <Favourites/>
                </div>
            </div>
        </div>
    </>
    );
}

export default Navbar;