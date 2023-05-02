import express, { Express } from 'express';
import 'express-async-errors';
import cors from 'cors';

import { connectDb, connectRedis, disconnectDB, disconnectRedis, loadEnv } from './config';

loadEnv();

import { handleApplicationErrors } from './middlewares';
import { 
  usersRouter
} from '@/routers';


const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/users', usersRouter)

export function init(): Promise<Express> {
  connectDb();
  connectRedis();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
  await disconnectRedis();
}

export default app;