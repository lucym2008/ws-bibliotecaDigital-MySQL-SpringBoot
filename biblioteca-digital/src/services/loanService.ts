import api from './api';

export interface Loan {
    id?: string;
    userId: string;
    bookId: number;
    loanDate: string;
    dueDate: string;
    returnDate?: string | null;
    status: 'ACTIVE' | 'RETURNED' | 'OVERDUE';
}

export const loanService = {
    async createLoan(userId: string, bookId: number): Promise<Loan> {
        const response = await api.post('/loans', { userId, bookId });
        return response.data;
    },

    async returnBook(loanId: string): Promise<void> {
        await api.put(`/loans/${loanId}/return`);
    },

    async getLoansByUser(userId: string): Promise<Loan[]> {
        const response = await api.get(`/users/${userId}/loans`);
        return response.data;
    },

    async getActiveLoans(): Promise<Loan[]> {
        const response = await api.get('/loans/active');
        return response.data;
    }
};