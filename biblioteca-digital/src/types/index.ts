export interface User {
    id?: string;
    name: string;
    email: string;
    password?: string;
    role: 'ADMIN' | 'USER';
}

export interface Book {
    id?: number;
    title: string;
    author: string;
    isbn: string;
    publicationYear: number;
    available: boolean;
}

export interface Loan {
    id?: string;
    userId: string;
    bookId: number;
    loanDate: string;
    dueDate: string;
    returnDate?: string | null;
    status: 'ACTIVE' | 'RETURNED' | 'OVERDUE';
}