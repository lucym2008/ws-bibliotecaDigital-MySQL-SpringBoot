import { useEffect, useState } from 'react';
import { bookService } from '../services/bookService';
import type { Book } from '../types';

export function useBooks() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            setLoading(true);
            const data = await bookService.getAllBooks();
            setBooks(data);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar livros');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addBook = async (book: Omit<Book, 'id'>) => {
        try {
            const id = await bookService.createBook(book);
            await loadBooks();
            return id;
        } catch (err) {
            console.error('Erro ao adicionar livro:', err);
            throw err;
        }
    };

    const updateBook = async (id: string, book: Partial<Book>) => {
        try {
            await bookService.updateBook(id, book);
            await loadBooks();
        } catch (err) {
            console.error('Erro ao atualizar livro:', err);
            throw err;
        }
    };

    const deleteBook = async (id: string) => {
        try {
            await bookService.deleteBook(id);
            await loadBooks();
        } catch (err) {
            console.error('Erro ao deletar livro:', err);
            throw err;
        }
    };

    return { books, loading, error, addBook, updateBook, deleteBook, refresh: loadBooks };
}