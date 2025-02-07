declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      ALLOWED_URL?: string;
    }
  }
}

export {};
