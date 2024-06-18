declare global {
    interface ImportMeta {
        env: {
            VITE_API_ENDPOINT: string;
        };
    }
}

export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
