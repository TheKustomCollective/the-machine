import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../utils/prisma';

interface CreateAvatarBody {
  name: string;
  description?: string;
}

interface UpdateAvatarBody {
  name?: string;
  description?: string;
  imageUrl?: string;
  previewUrl?: string;
}

interface AvatarParams {
  id: string;
}

// Auth verification decorator
async function verifyAuth(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ error: 'Unauthorized' });
  }
}

export default async function avatarRoutes(server: FastifyInstance) {
  // GET /api/avatars - List all avatars for authenticated user
  server.get(
    '/',
    { preHandler: verifyAuth },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const user = request.user as { userId: string };
        const avatars = await prisma.avatar.findMany({
          where: { userId: user.userId },
          orderBy: { createdAt: 'desc' },
        });

        return reply.send({ avatars });
      } catch (error) {
        server.log.error(error);
        return reply.status(500).send({ error: 'Internal server error' });
      }
    }
  );

  // POST /api/avatars - Create a new avatar
  server.post<{ Body: CreateAvatarBody }>(
    '/',
    { preHandler: verifyAuth },
    async (request: FastifyRequest<{ Body: CreateAvatarBody }>, reply: FastifyReply) => {
      try {
        const user = request.user as { userId: string };
        const { name, description } = request.body;

        if (!name) {
          return reply.status(400).send({ error: 'Name is required' });
        }

        const avatar = await prisma.avatar.create({
          data: {
            userId: user.userId,
            name,
            description,
          },
        });

        return reply.status(201).send({ avatar });
      } catch (error) {
        server.log.error(error);
        return reply.status(500).send({ error: 'Internal server error' });
      }
    }
  );

  // GET /api/avatars/:id - Get a specific avatar
  server.get<{ Params: AvatarParams }>(
    '/:id',
    { preHandler: verifyAuth },
    async (request: FastifyRequest<{ Params: AvatarParams }>, reply: FastifyReply) => {
      try {
        const user = request.user as { userId: string };
        const { id } = request.params;

        const avatar = await prisma.avatar.findFirst({
          where: {
            id,
            userId: user.userId,
          },
        });

        if (!avatar) {
          return reply.status(404).send({ error: 'Avatar not found' });
        }

        return reply.send({ avatar });
      } catch (error) {
        server.log.error(error);
        return reply.status(500).send({ error: 'Internal server error' });
      }
    }
  );

  // PATCH /api/avatars/:id - Update an avatar
  server.patch<{ Params: AvatarParams; Body: UpdateAvatarBody }>(
    '/:id',
    { preHandler: verifyAuth },
    async (
      request: FastifyRequest<{ Params: AvatarParams; Body: UpdateAvatarBody }>,
      reply: FastifyReply
    ) => {
      try {
        const user = request.user as { userId: string };
        const { id } = request.params;
        const updates = request.body;

        // Check if avatar exists and belongs to user
        const existingAvatar = await prisma.avatar.findFirst({
          where: {
            id,
            userId: user.userId,
          },
        });

        if (!existingAvatar) {
          return reply.status(404).send({ error: 'Avatar not found' });
        }

        // Update avatar
        const avatar = await prisma.avatar.update({
          where: { id },
          data: updates,
        });

        return reply.send({ avatar });
      } catch (error) {
        server.log.error(error);
        return reply.status(500).send({ error: 'Internal server error' });
      }
    }
  );
}
