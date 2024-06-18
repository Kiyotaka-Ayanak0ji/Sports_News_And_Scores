export interface Sport {
    id: number;
    name: string;
}

export interface SportState {
    sports: Sport[];
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    sport?: Sport;
}

export const initialSportState: SportState = {
    sports: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
    sport: undefined,
};