export interface Avatar {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  previewUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
