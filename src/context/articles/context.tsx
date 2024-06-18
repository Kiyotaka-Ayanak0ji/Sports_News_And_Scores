import React, { createContext, useContext, useReducer } from "react";
import { ArticlesState } from "./types";
import { reducer, initialState, ArticleActions } from "./reducer";

const ArticlesStateContext = createContext<ArticlesState>(initialState);

const ArticlesDispatchContext = createContext<React.Dispatch<ArticleActions> | undefined>(undefined);

export const ArticlesProvider: React.FC<React.PropsWithChildren> = ({ children }) =>
{
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ArticlesStateContext.Provider value={state}>
      <ArticlesDispatchContext.Provider value={dispatch}>
        {children}
      </ArticlesDispatchContext.Provider>
    </ArticlesStateContext.Provider>
  );
};

export const useArticlesState = () => useContext(ArticlesStateContext);

export const useArticlesDispatch = () => useContext(ArticlesDispatchContext);