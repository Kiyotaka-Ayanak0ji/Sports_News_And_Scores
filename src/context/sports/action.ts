import { API_ENDPOINT } from "../../config/constants";

export const fetchSports = async (dispatch: any) => {
    try {
        dispatch({ type: "FETCH_SPORTS_REQUEST" });
        const response = await fetch(`${API_ENDPOINT}/sports`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch sports");
        }

        const data = await response.json();

        dispatch({ type: "FETCH_SPORTS_SUCCESS", payload: data.sports });
    }
    catch (error) {
        dispatch({ type: "FETCH_SPORTS_FAILURE", payload: "Unable to fetch sports" });
    }
}

export const fetchSport = async (dispatch: any, id: number) => {
    try {
        dispatch({ type: "FETCH_SPORT_REQUEST" });
        const response = await fetch(`${API_ENDPOINT}/sports/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch sport");
        }

        const data = await response.json();

        dispatch({ type: "FETCH_SPORT_SUCCESS", payload: data });
    }
    catch (error) {
        dispatch({ type: "FETCH_SPORT_FAILURE", payload: "Unable to fetch sport" });
    }
}

