/**
 * Tipos de Autenticación
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  isActive: boolean;
  isBlocked: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  lastLoginIp?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string; // Optional porque viene en cookie HTTPOnly
}

export interface SignInDto {
  identifier: string;
  password: string;
}

export interface SignUpDto {
  identifier: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  message: string;
  accessToken: string;
  user: User;
}

export interface RefreshResponse {
  message: string;
  accessToken: string;
}

export interface SessionData {
  accessToken: string;
  user: User;
}