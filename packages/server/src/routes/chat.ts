import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../utils/prisma';
import { generateLLMResponse, generateTTSAudio } from '../services/ai';

interface ChatBody {
  message: string;
}

interface ChatParams {
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

export default async function chatRoutes(server: FastifyInstance) {
  // POST /api/avatars/:id/chat - Chat with an avatar
  server.post<{ Params: ChatParams; Body: ChatBody }>(
    '/:id/chat',
    { preHandler: verifyAuth },
    async (
      request: FastifyRequest<{ Params: ChatParams; Body: ChatBody }>,
      reply: FastifyReply
    ) => {
      try {
        const user = request.user as { userId: string };
        const { id } = request.params;
        const { message } = request.body;

        if (!message) {
          return reply.status(400).send({ error: 'Message is required' });
        }

        // Verify avatar exists and belongs to user
        const avatar = await prisma.avatar.findFirst({
          where: {
            id,
            userId: user.userId,
          },
        });

        if (!avatar) {
          return reply.status(404).send({ error: 'Avatar not found' });
        }

        // Generate LLM response (stubbed)
        const llmResponse = await generateLLMResponse(message, {
          id: avatar.id,
          name: avatar.name,
          description: avatar.description || undefined,
        });

        // Generate TTS audio (stubbed)
        const audioUrl = await generateTTSAudio(llmResponse, avatar.id);

        return reply.send({
          text: llmResponse,
          audio_url: audioUrl,
        });
      } catch (error) {
        server.log.error(error);
        return reply.status(500).send({ error: 'Internal server error' });
      }
    }
  );
}
