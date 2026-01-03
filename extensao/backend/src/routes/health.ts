export async function healthRoute(app: import('fastify').FastifyInstance) {
  app.get('/', async () => {
    return {
      status: 'ok',
      service: 'Cronus Flow API',
      version: process.env.GIT_SHA || 'dev'
    };
  });
}