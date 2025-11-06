export interface User {
  id: string;
  email: string;
  createdAt: Date;
}

export interface Avatar {
  id: string;
  userId: string;
  name: string;
  description?: string;
  imageUrl?: string;
  previewUrl?: string;
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
}
