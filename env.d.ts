/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_DATABASES_ID: string
    readonly VITE_PROJECT: string
    readonly VITE_PROJECT_API_ENDPOINT: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}