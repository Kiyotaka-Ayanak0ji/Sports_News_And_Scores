import React, { createContext, useContext, useReducer } from "react";
import {
  preferencesReducer,
  PreferencesActions,
} from "./reducer";
import { initialPreferencesState, PreferencesState } from "./types";

const PreferencesStateContext = createContext<PreferencesState>(initialPreferencesState);

const PreferencesDispatchContext = createContext< React.Dispatch<PreferencesActions> | undefined>(undefined);

export const PreferencesProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(preferencesReducer, initialPreferencesState);

  return (
    <PreferencesStateContext.Provider value={state}>
      <PreferencesDispatchContext.Provider value={dispatch}>
        {children}
      </PreferencesDispatchContext.Provider>
    </PreferencesStateContext.Provider>
  );
};


export const usePreferencesState = () => useContext(PreferencesStateContext);
export const usePreferencesDispatch = () =>
  useContext(PreferencesDispatchContext);

