// User types
export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

// Post types
export interface Post {
  id: string;
  content: string;
  userId: string;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

// Follow types
export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  follower?: User;
  following?: User;
  createdAt: string;
}

// Auth types
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

// API Response types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// API Status
export interface ApiStatus {
  status: string;
  version: string;
  environment: string;
  timestamp: string;
}
