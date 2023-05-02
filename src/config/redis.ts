import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

export const redis = createClient({
  url: process.env.REDIS_URL
});

export async function connectRedis() {
  return await redis.connect();
}

export async function disconnectRedis() {
  return await redis.disconnect();
}
