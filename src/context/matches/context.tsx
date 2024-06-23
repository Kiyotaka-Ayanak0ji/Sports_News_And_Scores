import React, { useReducer , createContext, useContext } from "react";
import { MatchActions , MatchState , reducer , initialState } from "./reducer";

export const MatchStateContext = createContext<MatchState> (initialState);

export type MatchDispatch = React.Dispatch<MatchActions>

export const MatchDispatchContext = createContext<MatchDispatch | undefined> (
    undefined
)
export const MatchProvider:React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state,dispatch] = useReducer(reducer,initialState);

    return(
        <MatchStateContext.Provider value={state}>
            <MatchDispatchContext.Provider value={dispatch}>
                { children }
            </MatchDispatchContext.Provider>
        </MatchStateContext.Provider>
    )
}


export const useMatchState = () => useContext(MatchStateContext);

export const useMatchDispatch = () => useContext(MatchDispatchContext);