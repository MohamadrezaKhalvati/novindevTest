export interface Env {
  APP_PORT: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_PORT: string;
  POSTGRES_HOST: string;
  POSTGRES_DB: string;
  POSTGRES_SYNCHRONIZE : boolean
  POSTGRES_LOGGING : boolean
  NODE_ENV: 'DEVELOPMENT' | 'PRODUCTION' | 'TEST';
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

export { };

