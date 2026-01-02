import { FastifyInstance } from 'fastify';
import { generateSalesReply } from '../services/ai.service.js';

export async function analyzeRoute(app: FastifyInstance) {
  app.post(
    '/analyze',
    {
      schema: {
        body: {
          type: 'object',
          required: ['leadMessage'],
          properties: {
            leadMessage: { type: 'string', minLength: 3 },
            channel: { type: 'string' },
            language: { type: 'string' }
          }
        },
        response: {
          200: {
            type: 'object',
            required: ['reply'],
            properties: {
              reply: { type: 'string' }
            }
          },
          500: {
            type: 'object',
            required: ['error', 'message'],
            properties: {
              error: { type: 'string' },
              message: { type: 'string' }
            }
          }
        }
      }
    },
    async (req, reply) => {
      const { leadMessage, channel, language } = req.body as any;

      app.log.info({ leadMessage }, '[Analyze] Mensagem recebida');

      try {
        const aiReply = await generateSalesReply({
          leadMessage,
          channel,
          language
        });

        return { reply: aiReply };
      } catch (err) {
        app.log.error(err, '[Analyze] Erro na IA');

        return reply.status(500).send({
          error: 'AI_ERROR',
          message: 'Falha ao gerar sugestão'
        });
      }
    }
  );
}
