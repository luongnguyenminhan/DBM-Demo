import axiosInstance from './axiosInstance';
import type {
	LoginRequest,
	SignupRequest,
	TokenRefreshRequest,
	EmailVerificationRequest,
	EmailRequest,
	PasswordResetConfirmRequest,
	LoginResponseModel,
	SignupResponseModel,
	TokenRefreshResponseModel,
	EmailVerificationResponseModel,
	PasswordResetResponseModel,
	LogoutResponseModel,
	PasswordResetRequestResponseModel,
	EmailRequestResponseModel
} from "../types/auth.type";

const authApi = {
	login: async (data: LoginRequest): Promise<LoginResponseModel> => {
		const response = await axiosInstance.post('/auth/login', data);
		return response.data;
	},
	signup: async (data: SignupRequest): Promise<SignupResponseModel> => {
		const response = await axiosInstance.post('/auth/signup', data);
		return response.data;
	},
	refreshToken: async (data: TokenRefreshRequest): Promise<TokenRefreshResponseModel> => {
		const response = await axiosInstance.post('/auth/refresh', data);
		return response.data;
	},
	requestEmailVerification: async (data: EmailRequest): Promise<EmailRequestResponseModel> => {
		const response = await axiosInstance.post('/auth/verify-email/request', data);
		return response.data;
	},
	verifyEmail: async (data: EmailVerificationRequest): Promise<EmailVerificationResponseModel> => {
		const response = await axiosInstance.post('/auth/verify-email', data);
		return response.data;
	},
	requestPasswordReset: async (data: EmailRequest): Promise<PasswordResetRequestResponseModel> => {
		const response = await axiosInstance.post('/auth/reset-password/request', data);
		return response.data;
	},
	resetPassword: async (data: PasswordResetConfirmRequest): Promise<PasswordResetResponseModel> => {
		const response = await axiosInstance.post('/auth/reset-password', data);
		return response.data;
	},
	logout: async (): Promise<LogoutResponseModel> => {
		const response = await axiosInstance.post('/auth/logout');
		return response.data;
	}
};

export default authApi;
