import React, { createContext, useContext, useReducer } from "react";
import { MatchesState } from "./types";
import { reducer, initialState, MatchesActions } from "./reducer";

const MatchesStateContext = createContext<MatchesState >(initialState);

const MatchesDispatchContext = createContext<React.Dispatch<MatchesActions> | undefined>(undefined);

export const MatchesProvider: React.FC<React.PropsWithChildren> = ({ children }) =>
{
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MatchesStateContext.Provider value={state}>
      <MatchesDispatchContext.Provider value={dispatch}>
        {children}
      </MatchesDispatchContext.Provider>
    </MatchesStateContext.Provider>
  );
};

export const useMatchesState = () => useContext(MatchesStateContext);

export const useMatchesDispatch = () => useContext(MatchesDispatchContext);