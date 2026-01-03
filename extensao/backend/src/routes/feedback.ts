import { FastifyInstance } from 'fastify';
import { connectMongo } from '../db/mongo.js';

export async function feedbackRoute(app: FastifyInstance) {
  app.post('/feedback', async (req, reply) => {
    const { leadMessage, reply: aiReply, result, channel } = req.body as any;

    const db = await connectMongo();

    await db.collection('feedbacks').insertOne({
      createdAt: new Date(),
      meta: {
        leadMessage,
        reply: aiReply,
        result,
        channel: channel || 'unknown',
      },
    });

    return { ok: true };
  });
}
