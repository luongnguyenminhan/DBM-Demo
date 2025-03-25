export interface LoginRequest {
	email: string;
	password: string;
}

export interface SignupRequest {
	email: string;
	username: string;
	password: string;
	confirm_password: string;
	device_address: string;
	role_id?: string;
}

export interface TokenRefreshRequest {
	refresh_token: string;
}

export interface EmailVerificationRequest {
	email: string;
	token: string;
}

export interface EmailRequest {
	email: string;
}

export interface PasswordResetConfirmRequest {
	token: string;
	new_password: string;
}

// Response models that match the backend structure
export interface TokenResponse {
	access_token: string;
	refresh_token: string;
	token_type: string;
	email: string;
}

export interface UserResponse {
	id: string;
	email: string;
	username: string;
	role_id?: string;
	confirmed: boolean;
}

// Import the CommonResponse interface from common.model.ts
import { CommonResponse } from './common.type';

// Auth specific response types using the CommonResponse pattern
export type LoginResponseModel = CommonResponse<TokenResponse>;
export type SignupResponseModel = CommonResponse<UserResponse>;
export type TokenRefreshResponseModel = CommonResponse<TokenResponse>;
export type EmailVerificationResponseModel = CommonResponse<null>;
export type PasswordResetResponseModel = CommonResponse<null>;
export type LogoutResponseModel = CommonResponse<null>;
export type PasswordResetRequestResponseModel = CommonResponse<null>;
export type EmailRequestResponseModel = CommonResponse<null>;
