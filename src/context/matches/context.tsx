import React, { useReducer , createContext } from "react";
import { MatchActions , MatchState , reducer , initialState } from "./reducer";

export const MatchStateContext = createContext<MatchState | undefined> (undefined);

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


export const useMatchState = () => createContext(MatchStateContext);

export const useMatchDispatch = () => createContext(MatchDispatchContext);