import { Sport } from "./sports";
import { Team } from "./matches";

export type News = {
    id: number;
    title: string;
    summary: string;
    thumbnail: string;
    sport: Sport;
    date: string;
    content: string;
    teams: Team[];
}

export interface NewsState {
    news: News[],
    isLoading: boolean,
    isError: boolean,
    errorMessage: string
}

export const initialState:NewsState = {
    news: [],
    isLoading: false,
    isError: false,
    errorMessage: ""
}