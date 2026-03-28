import api from './api';

export interface User {
    id?: string;
    name: string;
    email: string;
    password?: string;
    role: 'ADMIN' | 'USER';
}

export const userService = {
    async getAllUsers(): Promise<User[]> {
        const response = await api.get('/users');
        return response.data;
    },

    async getUserById(id: string): Promise<User> {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },

    async createUser(user: Omit<User, 'id'>): Promise<User> {
        const response = await api.post('/users', user);
        return response.data;
    },

    async updateUser(id: string, user: Partial<User>): Promise<void> {
        await api.put(`/users/${id}`, user);
    },

    async deleteUser(id: string): Promise<void> {
        await api.delete(`/users/${id}`);
    },

    async login(email: string, password: string): Promise<User> {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    }
};