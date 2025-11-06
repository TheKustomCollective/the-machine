import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../utils/prisma';

interface GeneratePreviewBody {
  avatarId: string;
}

// Auth verification decorator
async function verifyAuth(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ error: 'Unauthorized' });
  }
}

export default async function jobRoutes(server: FastifyInstance) {
  // POST /api/jobs/generate-preview
  server.post<{ Body: GeneratePreviewBody }>(
    '/generate-preview',
    { preHandler: verifyAuth },
    async (request: FastifyRequest<{ Body: GeneratePreviewBody }>, reply: FastifyReply) => {
      try {
        const user = request.user as { userId: string };
        const { avatarId } = request.body;

        if (!avatarId) {
          return reply.status(400).send({ error: 'avatarId is required' });
        }

        // Verify avatar exists and belongs to user
        const avatar = await prisma.avatar.findFirst({
          where: {
            id: avatarId,
            userId: user.userId,
          },
        });

        if (!avatar) {
          return reply.status(404).send({ error: 'Avatar not found' });
        }

        // Create job record
        const job = await prisma.job.create({
          data: {
            type: 'generate-preview',
            status: 'pending',
            payload: JSON.stringify({ avatarId }),
          },
        });

        // Simulate async processing (in real app, this would be a background job)
        // For now, we'll just create a placeholder S3 URL
        setTimeout(async () => {
          try {
            const previewUrl = `https://storage.example.com/previews/${avatarId}.mp4`;

            await prisma.job.update({
              where: { id: job.id },
              data: {
                status: 'completed',
                result: previewUrl,
              },
            });

            await prisma.avatar.update({
              where: { id: avatarId },
              data: { previewUrl },
            });
          } catch (err) {
            server.log.error(err);
            await prisma.job.update({
              where: { id: job.id },
              data: {
                status: 'failed',
                error: 'Failed to generate preview',
              },
            });
          }
        }, 1000);

        return reply.status(202).send({
          jobId: job.id,
          status: job.status,
          message: 'Preview generation job enqueued',
        });
      } catch (error) {
        server.log.error(error);
        return reply.status(500).send({ error: 'Internal server error' });
      }
    }
  );

  // GET /api/jobs/:id - Get job status
  server.get<{ Params: { id: string } }>(
    '/:id',
    { preHandler: verifyAuth },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
      try {
        const { id } = request.params;

        const job = await prisma.job.findUnique({
          where: { id },
        });

        if (!job) {
          return reply.status(404).send({ error: 'Job not found' });
        }

        return reply.send({
          job: {
            id: job.id,
            type: job.type,
            status: job.status,
            result: job.result,
            error: job.error,
            createdAt: job.createdAt,
            updatedAt: job.updatedAt,
          },
        });
      } catch (error) {
        server.log.error(error);
        return reply.status(500).send({ error: 'Internal server error' });
      }
    }
  );
}
