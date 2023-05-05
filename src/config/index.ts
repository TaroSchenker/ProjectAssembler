import * as dotenv from 'dotenv';

interface Config {
  NODE_ENV: string;
  PORT: number;
  // Add more configurations as needed
}

export function loadConfig(): Config {
  dotenv.config();

  const config: Config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: Number(process.env.PORT) || 3000,
    // Load more configurations as needed
  };

  return config;
}
