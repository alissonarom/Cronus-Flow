import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { analyzeRoute } from './routes/analyze.js';
import { feedbackRoute } from './routes/feedback.js';

export async function buildApp() {
  const app = Fastify({ logger: true });

  await app.register(cors, { origin: true });

  await app.register(rateLimit, {
    max: 30,
    timeWindow: '1 hour',
    keyGenerator: (req) => {
      return req.headers['authorization'] || req.ip;
    },
    errorResponseBuilder: () => {
      return {
        error: 'RATE_LIMIT_EXCEEDED',
        message: 'Limite de uso atingido. Tente novamente mais tarde.'
      };
    }
  });

  await app.register(analyzeRoute, { prefix: '/v1' });
  await app.register(feedbackRoute, { prefix: '/v1' });

  return app;
}
