// Stubbed AI services for LLM and TTS

interface Avatar {
  id: string;
  name: string;
  description?: string;
}

/**
 * Generate LLM response (stubbed)
 * In production, this would call OpenAI, Anthropic, or another LLM provider
 */
export async function generateLLMResponse(message: string, avatar: Avatar): Promise<string> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return stubbed response
  const responses = [
    `Hello! I'm ${avatar.name}. I received your message: "${message}". How can I help you today?`,
    `As ${avatar.name}, I find that interesting. You said: "${message}". Tell me more!`,
    `Thanks for reaching out! I'm ${avatar.name}, and I'm here to chat about: "${message}".`,
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Generate TTS audio (stubbed)
 * In production, this would call ElevenLabs, Google TTS, or another TTS provider
 */
export async function generateTTSAudio(text: string, avatarId: string): Promise<string> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Return stubbed S3 URL or local file path
  const timestamp = Date.now();
  const audioUrl = `https://storage.example.com/audio/${avatarId}/${timestamp}.mp3`;

  // In production, this would:
  // 1. Call TTS API to generate audio from text
  // 2. Upload audio file to S3 or similar storage
  // 3. Return the public URL

  return audioUrl;
}
