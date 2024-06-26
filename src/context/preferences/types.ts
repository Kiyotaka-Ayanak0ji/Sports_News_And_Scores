
export interface UserPreferences {
	preferences: {
		selectedTeams: string[],
		selectedSports: string[]
	}
}

export interface PreferencesState {
	preferences: UserPreferences;
	isLoading: boolean;
	isError: boolean;
	errorMessage: string;
}

export const initialPreferencesState: PreferencesState = {
	preferences: {preferences: {
		selectedTeams: [],
		selectedSports: []
	}},
	isLoading: false,
	isError: false,
	errorMessage: "",
  };