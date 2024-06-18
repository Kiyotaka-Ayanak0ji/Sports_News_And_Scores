export interface Team {
    id: number;
    name: string;
    plays : string;
}

export interface TeamsState {
    teams: Team[];
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    team?: Team;
}

export const initialTeamsState: TeamsState = {
    teams: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
    team: undefined,
};