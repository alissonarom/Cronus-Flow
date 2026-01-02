import 'dotenv/config';

import { connectMongo } from './db/mongo';
import { ensureFeedbacksCollection } from './db/initTimeSeries';

import { buildApp } from './app.js';

const PORT = Number(process.env.PORT) || 3000;

async function start() {
  const db = await connectMongo();
  await ensureFeedbacksCollection(db);
  const app = await buildApp();

  await app.listen({
    port: PORT,
    host: '0.0.0.0'
  });
  console.log(`🚀 Cronus Flow API rodando em http://localhost:${PORT}`);
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});