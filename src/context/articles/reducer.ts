import { Reducer } from "react";
import { Article, ArticlesState } from "./types";

export const initialState: ArticlesState = {
  articles: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};
export type ArticleActions =
    | { type: "FETCH_ARTICLES_REQUEST" }
    | { type: "FETCH_ARTICLES_SUCCESS"; payload: Article[] }
    | { type: "FETCH_ARTICLES_FAILURE"; payload: string };


export const reducer: Reducer<ArticlesState, any> = (
    state :ArticlesState = initialState,
    action: ArticleActions
    ): ArticlesState => {
  switch (action.type) {
    case "FETCH_ARTICLES_REQUEST":
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };
    case "FETCH_ARTICLES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        articles: action.payload,
      };
    case "FETCH_ARTICLES_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};