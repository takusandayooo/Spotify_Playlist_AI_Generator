import { z } from 'zod';

const EnvSchema = z.object({
  GEMINI_API_KEY: z.string(),
  SPOTIFY_CLIENT_ID: z.string(),
  SPOTIFY_CLIENT_SECRET: z.string(),
});

export const getEnvContent = () => {
  const env = require('dotenv').config().parsed;
  console.log(env);
  return EnvSchema.parse(env);
};