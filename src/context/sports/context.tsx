import React, { createContext, useContext, useReducer } from "react";
import { SportState, initialSportState } from "./types";
import { reducer, SportActions } from "./reducer";

const SportStateContext = createContext<SportState>(initialSportState);

const SportDispatchContext = createContext<React.Dispatch<SportActions> | undefined>(undefined);

export const SportProvider: React.FC<React.PropsWithChildren> = ({ children }) =>
{
  const [state, dispatch] = useReducer(reducer, initialSportState);

  return (
    <SportStateContext.Provider value={state}>
      <SportDispatchContext.Provider value={dispatch}>
        {children}
      </SportDispatchContext.Provider>
    </SportStateContext.Provider>
  );
};

export const useSportState = () => useContext(SportStateContext);

export const useSportDispatch = () => useContext(SportDispatchContext);