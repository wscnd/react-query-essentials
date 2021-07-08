declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      BASE_URL: string;
      DEV: string;
      MODE: string;
      PROD: string;
      SSR: string;
      API_SERVER: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
