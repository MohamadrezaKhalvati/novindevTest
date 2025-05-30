export interface Env {
    NODE_ENV: 'development' | 'production' | 'test'
    PORT: string
    POSTGRES_HOST: string
    POSTGRES_PORT: string
    POSTGRES_USER: string
    POSTGRES_PASSWORD: string
    POSTGRES_DB: string
    POSTGRES_SYNCHRONIZE: string
    POSTGRES_LOGGING: string
    POSTGRES_SSL: string
}
declare global {
    namespace NodeJS {
        interface ProcessEnv extends Env {}
    }
}

export { }

