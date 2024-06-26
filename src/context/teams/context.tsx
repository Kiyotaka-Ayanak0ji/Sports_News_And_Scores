import React, { createContext, useContext, useReducer } from "react";
import { TeamsState, initialTeamsState } from "./types";
import { reducer, TeamActions } from "./reducer";

const TeamsStateContext = createContext<TeamsState>(initialTeamsState);

const TeamsDispatchContext = createContext<React.Dispatch<TeamActions> | undefined>(undefined);

export const TeamsProvider: React.FC<React.PropsWithChildren> = ({ children }) =>
{
  const [state, dispatch] = useReducer(reducer, initialTeamsState);

  return (
    <TeamsStateContext.Provider value={state}>
      <TeamsDispatchContext.Provider value={dispatch}>
        {children}
      </TeamsDispatchContext.Provider>
    </TeamsStateContext.Provider>
  );
};

export const useTeamsState = () => useContext(TeamsStateContext);

export const useTeamsDispatch = () => useContext(TeamsDispatchContext);
