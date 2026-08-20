import apiClient from './client';
import type { LoginResponse } from '../types';

export const authApi = {
    login: async (credentials: { username: string; password: string }): Promise<LoginResponse> => {
        const response = await apiClient.post('/auth/login', credentials);
        return response.data;
    },
};