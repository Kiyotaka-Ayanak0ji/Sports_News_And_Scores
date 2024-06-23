import React, { createContext, useReducer, useState } from 'react'
import { UserActions, UserState, initialState, reducer } from './reducer';

const UserStateContext = createContext<UserState|undefined>(undefined);

export type UserDispatch = React.Dispatch<UserActions>;

const UserDispatchContext = createContext<UserDispatch|undefined>(undefined);


export const UserProvider:React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state,dispatch] = useReducer(reducer,initialState);

    return(
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                { children }
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    );
};

export const useUserState = () => useState(UserStateContext);
export const useUserDispatch = () => useState(UserDispatchContext);