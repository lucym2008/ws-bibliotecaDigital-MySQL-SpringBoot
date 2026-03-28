import React, { useEffect, useState } from 'react';
import { bookService } from '../../services/bookService';
import '../../styles/bookList.css'
import type { Book } from '../../types';

export function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            const data = await bookService.getAllBooks();
            setBooks(data);
        } catch (err) {
            setError('Erro ao carregar livros do servidor');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Carregando livros...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="book-list-container">
            <h1 className="page-title">📚 Acervo de Livros</h1>
            {books.length === 0 ? (
                <div className="empty-state">
                    <p>Nenhum livro cadastrado.</p>
                </div>
            ) : (
                <div className="book-grid">
                    {books.map(book => (
                        <div key={book.id} className="book-card">
                            <h3 className="book-title">{book.title}</h3>
                            <p className="book-author">{book.author}</p>
                            <p className="book-isbn">ISBN: {book.isbn}</p>
                            <p className="book-year">Ano: {book.publicationYear}</p>
                            <div className="book-status">
                                <span className={`status-badge ${book.available ? 'available' : 'borrowed'}`}>
                                    {book.available ? 'Disponível' : 'Emprestado'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}