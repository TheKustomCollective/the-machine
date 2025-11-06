export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface Avatar {
  id: string;
  userId: string;
  name: string;
  description?: string;
  imageUrl?: string;
  previewUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
}

export interface JobStatus {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: string;
  error?: string;
  createdAt: string;
  updatedAt: string;
}
