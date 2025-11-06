import { Avatar } from '../types';

// In a real app, this would come from environment variables
// const API_BASE_URL = 'http://localhost:3000/api';

// Stubbed API service for development
export const avatarApi = {
  // Get all avatars
  async getAvatars(): Promise<Avatar[]> {
    // Stubbed data for now - in real app, this would make API call
    return [
      {
        id: '1',
        name: 'Alex the AI',
        description: 'A friendly AI assistant',
        imageUrl: 'https://via.placeholder.com/150',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Bella Bot',
        description: 'Creative and artistic',
        imageUrl: 'https://via.placeholder.com/150',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Charlie Chat',
        description: 'Always ready to talk',
        imageUrl: 'https://via.placeholder.com/150',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  },

  // Create a new avatar
  async createAvatar(name: string, description?: string): Promise<Avatar> {
    // In real app: await axios.post(`${API_BASE_URL}/avatars`, { name, description })
    return {
      id: Date.now().toString(),
      name,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },
};
