import type { User } from "../types/User";
import api from "./api";

export const userService = {

    async register(user: Omit<User, "id">): Promise<User> {
        const res = await api.post("/users", user);
        return res.data;
    },

    async login(email: string, password: string): Promise<User> {
        const res = await api.post("/users/login", { email, password });
        return res.data;
    },

    async getAll(): Promise<User[]> {
        const res = await api.get("/users");
        return res.data;
    }
};