import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt';
import prisma from '../utils/prisma';

interface SignupBody {
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export default async function authRoutes(server: FastifyInstance) {
  // POST /api/auth/signup
  server.post<{ Body: SignupBody }>(
    '/signup',
    async (request: FastifyRequest<{ Body: SignupBody }>, reply: FastifyReply) => {
      const { email, password } = request.body;

      if (!email || !password) {
        return reply.status(400).send({ error: 'Email and password are required' });
      }

      try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
          return reply.status(409).send({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
          },
        });

        // Generate JWT token
        const token = server.jwt.sign({
          userId: user.id,
          email: user.email,
        });

        return reply.status(201).send({
          token,
          user: {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
          },
        });
      } catch (error) {
        server.log.error(error);
        return reply.status(500).send({ error: 'Internal server error' });
      }
    }
  );

  // POST /api/auth/login
  server.post<{ Body: LoginBody }>(
    '/login',
    async (request: FastifyRequest<{ Body: LoginBody }>, reply: FastifyReply) => {
      const { email, password } = request.body;

      if (!email || !password) {
        return reply.status(400).send({ error: 'Email and password are required' });
      }

      try {
        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          return reply.status(401).send({ error: 'Invalid credentials' });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return reply.status(401).send({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = server.jwt.sign({
          userId: user.id,
          email: user.email,
        });

        return reply.send({
          token,
          user: {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
          },
        });
      } catch (error) {
        server.log.error(error);
        return reply.status(500).send({ error: 'Internal server error' });
      }
    }
  );
}
