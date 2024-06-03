import React, { useReducer, useState } from "react";
import { createContext } from "react";

import { SportActions, SportState, initialState ,reducer } from "./reducer";


const SportStateContext = createContext<SportState | undefined>(undefined);

export type SportsDispatch = React.Dispatch<SportActions>

export const SportsDispatchContext = createContext<SportsDispatch | undefined>(
    undefined
);

export const SportProvider:React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state,dispatch] = useReducer(reducer,initialState);

    return (
        <SportStateContext.Provider value={state}>
            <SportsDispatchContext.Provider value={dispatch}>
                {children}
            </SportsDispatchContext.Provider>
        </SportStateContext.Provider>
    )
}

export const useSportsState = () => useState(SportStateContext);

export const useSportsDispatch = () => useState(SportsDispatchContext);