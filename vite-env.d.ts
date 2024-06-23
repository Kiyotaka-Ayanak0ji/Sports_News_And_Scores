export interface ImportMetaEnv {
    [x: string]: any
    readonly VITE_API_ENDPOINT: string
}

export interface ImportMeta {
    readonly env: ImportMetaEnv
}