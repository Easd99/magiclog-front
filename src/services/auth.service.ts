import api from './api';
import {ERROR_TRANSLATIONS} from "../constants/errorMessages";


interface LoginDto {
    email: string;
    password: string;
}

interface RegisterDto {
    name: string;
    email: string;
    role: 'user' | 'seller';
    password: string;
    confirmPassword: string;
}

export const authService = {

    login: async ({email, password}: LoginDto) => {
        try {
            const response = await api.post('/auth/login', {email, password});
            return response.data;
        } catch (err: any) {
            const backendMessage = err.response?.data?.message || 'Error desconocido';
            const translated = ERROR_TRANSLATIONS[backendMessage] || backendMessage;
            throw new Error(translated);
        }
    },


    register: async ({name, email, role, password, confirmPassword}: RegisterDto) => {
        try {
            const response = await api.post('/users/', {
                name,
                email,
                role,
                password,
                confirmPassword,
            });
            return response.data;
        } catch (err: any) {
            const backendMessage = err.response?.data?.message || 'Error desconocido';
            const translated = ERROR_TRANSLATIONS[backendMessage] || backendMessage;
            throw new Error(translated);
        }
    },

    logout: async () => {
        const response = await api.post('/auth/logout');
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },
};
