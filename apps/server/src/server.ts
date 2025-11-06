import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyEnv from '@fastify/env';
import { config as dotenvConfig } from 'dotenv';

// Load environment variables
dotenvConfig();

const envSchema = {
  type: 'object',
  required: ['DATABASE_URL', 'JWT_SECRET'],
  properties: {
    PORT: {
      type: 'number',
      default: 3000
    },
    HOST: {
      type: 'string',
      default: '0.0.0.0'
    },
    DATABASE_URL: {
      type: 'string'
    },
    JWT_SECRET: {
      type: 'string'
    },
    JWT_EXPIRATION: {
      type: 'string',
      default: '7d'
    },
    CORS_ORIGIN: {
      type: 'string',
      default: '*'
    },
    NODE_ENV: {
      type: 'string',
      default: 'development'
    }
  }
};

async function buildServer() {
  const fastify = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname'
        }
      }
    }
  });

  // Register environment variables plugin
  await fastify.register(fastifyEnv, {
    schema: envSchema,
    dotenv: true
  });

  // Register CORS
  await fastify.register(cors, {
    origin: fastify.config.CORS_ORIGIN,
    credentials: true
  });

  // Health check endpoint
  fastify.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    };
  });

  // API status endpoint
  fastify.get('/api/v1/status', async () => {
    return {
      status: 'running',
      version: '0.1.0',
      environment: fastify.config.NODE_ENV,
      timestamp: new Date().toISOString()
    };
  });

  // Root endpoint
  fastify.get('/', async () => {
    return {
      name: 'The Machine API',
      version: '0.1.0',
      description: 'AI Social Metaverse Backend',
      endpoints: {
        health: '/health',
        status: '/api/v1/status',
        docs: '/api/v1/docs'
      }
    };
  });

  // 404 handler
  fastify.setNotFoundHandler((request, reply) => {
    reply.status(404).send({
      statusCode: 404,
      error: 'Not Found',
      message: `Route ${request.method}:${request.url} not found`
    });
  });

  // Error handler
  fastify.setErrorHandler((error, request, reply) => {
    fastify.log.error(error);
    
    const statusCode = error.statusCode || 500;
    
    reply.status(statusCode).send({
      statusCode,
      error: error.name || 'Internal Server Error',
      message: error.message || 'An unexpected error occurred'
    });
  });

  return fastify;
}

async function start() {
  try {
    const fastify = await buildServer();
    
    const port = Number(process.env.PORT) || 3000;
    const host = process.env.HOST || '0.0.0.0';
    
    await fastify.listen({ port, host });
    
    console.log(`
🚀 Server is running!
    
📡 API available at: http://localhost:${port}
🏥 Health check: http://localhost:${port}/health
📊 Status: http://localhost:${port}/api/v1/status
🌍 Environment: ${process.env.NODE_ENV || 'development'}
    `);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n⚠️  SIGINT signal received: closing server');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n⚠️  SIGTERM signal received: closing server');
  process.exit(0);
});

// Start the server
if (require.main === module) {
  start();
}

export { buildServer, start };
