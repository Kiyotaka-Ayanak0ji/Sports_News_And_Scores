import React, { createContext, useContext, useReducer, useState } from "react";
import { NewsState } from "../../types/articles";
import { reducer } from "./reducer";
import { NewsActions } from "./reducer";
import { initialState } from "../../types/articles";

const NewsStateContext = createContext<NewsState> (initialState);

export type NewsDispatch = React.Dispatch<NewsActions>;

export const NewsDispatchContext = createContext<NewsDispatch | undefined>(
    undefined
);

export const NewsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state,dispatch] = useReducer(reducer,initialState);

    return(
        <NewsStateContext.Provider value={state}>
            <NewsDispatchContext.Provider value={dispatch}>
                {children}
            </NewsDispatchContext.Provider>
        </NewsStateContext.Provider>
    )
}

export const useNewsState = () => useContext(NewsStateContext);

export const useNewsDispatch = () => useContext(NewsDispatchContext);