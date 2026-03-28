import api from './api';

export interface Book {
    id?: number;
    title: string;
    author: string;
    isbn: string;
    publicationYear: number;
    available: boolean;
}

export const bookService = {
    async getAllBooks(): Promise<Book[]> {
        const response = await api.get('/books');
        return response.data;
    },

    async getBookById(id: number): Promise<Book> {
        const response = await api.get(`/books/${id}`);
        return response.data;
    },

    async createBook(book: Omit<Book, 'id'>): Promise<Book> {
        const response = await api.post('/books', book);
        return response.data;
    },

    async updateBook(id: number, book: Partial<Book>): Promise<void> {
        await api.put(`/books/${id}`, book);
    },

    async deleteBook(id: number): Promise<void> {
        await api.delete(`/books/${id}`);
    }
};