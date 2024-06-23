import React, { useContext, useReducer } from "react";
import { createContext } from "react";

import { SportActions, SportState, initialSportState,reducer } from "./reducer";


const SportStateContext = createContext<SportState>(initialSportState);

export type SportsDispatch = React.Dispatch<SportActions>

export const SportsDispatchContext = createContext<SportsDispatch | undefined>(
    undefined
);

export const SportProvider:React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state,dispatch] = useReducer(reducer,initialSportState);

    return (
        <SportStateContext.Provider value={state}>
            <SportsDispatchContext.Provider value={dispatch}>
                {children}
            </SportsDispatchContext.Provider>
        </SportStateContext.Provider>
    )
}

export const useSportsState = () => useContext(SportStateContext);

export const useSportsDispatch = () => useContext(SportsDispatchContext);