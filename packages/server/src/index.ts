import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import avatarRoutes from './routes/avatars';
import jobRoutes from './routes/jobs';
import chatRoutes from './routes/chat';

dotenv.config();

const server = Fastify({
  logger: true,
});

// Register plugins
server.register(cors, {
  origin: true,
});

server.register(jwt, {
  secret: process.env.JWT_SECRET || 'fallback-secret-key',
});

// Health check endpoint
server.get('/api/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Register routes
server.register(authRoutes, { prefix: '/api/auth' });
server.register(avatarRoutes, { prefix: '/api/avatars' });
server.register(jobRoutes, { prefix: '/api/jobs' });
server.register(chatRoutes, { prefix: '/api/avatars' });

const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3000', 10);
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`Server listening on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
