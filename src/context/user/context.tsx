import React, { createContext, useContext, useReducer } from 'react'
import { UserActions, UserState, initialState, reducer } from './reducer';

const UserStateContext = createContext<UserState>(initialState);

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
}

export const useUserState = () => useContext(UserStateContext);
export const useUserDispatch = () => useContext(UserDispatchContext);