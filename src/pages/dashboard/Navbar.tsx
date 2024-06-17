import React, { Suspense, useEffect, useState } from 'react'
import { Bounce, ToastContainer } from 'react-toastify';
import Preferences from './Settings';
import { fetchSports } from '../../context/sport/actions';
import { fetchTeams } from '../../context/teams/actions';
import { useSportsDispatch } from '../../context/sport/context';
import { useTeamDispatch } from '../../context/teams/context';
import Logo from '../../assets/logo.png';
import ErrorBoundary from '../../ErrorBoundary';
const DarkMode = React.lazy(() => import("./DarkMode"));
const Profile = React.lazy(() => import('./Profile'));

const Navbar = () => {
    
    const navigation = [
        { name: "Sign out", href: "/logout" },
        { name: "Change Password", href: "/reset" }
    ];
    
    const sportsDispatch = useSportsDispatch();
    const teamsDispatch = useTeamDispatch();

    useEffect(() => {
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
                theme={"colored"}
                transition = {Bounce}
            />

            <div className="absolute mb-2 flex-row bg-gray-400 dark:bg-stone-500 font-semibold text-black dark:text-white">
                
                <div className='absolute left-0'>
                    <ErrorBoundary>
                        <Suspense fallback={<div className='suspense-loading'><span>Loading...<br/><progress value={10} aria-busy={true}/></span></div>}>
                            <img src={Logo} aria-busy={false} className='items-center h-16 w-18'/>
                        </Suspense>
                    </ErrorBoundary> 
                </div>
        
                <div className='absolute left-1/2 items-center justify-center'>
                    <h1 className='font-xl font-bold'>
                        Sports Center
                    </h1>
                </div>
        
                <div className='absolute right-full'>
                    <ErrorBoundary>
                        <Suspense fallback={<div className='suspense-loading'><span>Loading...<br/><progress value={10} aria-busy={true}/></span></div>}>
                            <Profile props={navigation} aria-busy={false}/>
                        </Suspense>
                    </ErrorBoundary>       
                </div>

                <div className='absolute right-3/4'>
                    <ErrorBoundary>
                        <Suspense fallback={<div className='suspense-loading'><span>Loading...<br/><progress value={10} aria-busy={true}/></span></div>}>
                            <Preferences aria-busy={false} />
                        </Suspense>
                    </ErrorBoundary>
                </div>

                <div className='absolute right-2/3'>
                    <ErrorBoundary>
                        <Suspense fallback={<div className='suspense-loading'><span>Loading...<br/><progress value={10} aria-busy={true}/></span></div>}>
                            <DarkMode aria-busy={false} />
                        </Suspense>
                    </ErrorBoundary> 
                </div>
            </div>
        </div>
    </>
    );
}

export default Navbar;