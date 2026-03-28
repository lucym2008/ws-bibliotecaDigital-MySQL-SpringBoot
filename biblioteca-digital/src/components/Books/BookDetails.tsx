import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookService } from '../../services/bookService';
import '../../styles/bookDetails.css';
import type { Book } from '../../types';

export function BookDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            loadBook();
        }
    }, [id]);

    const loadBook = async () => {
        try {
            const data = await bookService.getBookById(id!);
            if (data) {
                setBook(data);
            } else {
                setError('Livro não encontrado');
            }
        } catch (err) {
            setError('Erro ao carregar livro');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!book) return <div className="error-message">Livro não encontrado</div>;

    return (
        <div className="book-details-container">
            <button className="btn-back" onClick={() => navigate('/books')}>
                ← Voltar
            </button>
            
            <div className="book-details-card">
                <h1 className="book-details-title">{book.title}</h1>
                <div className="book-details-info">
                    <p><strong>Autor:</strong> {book.author}</p>
                    <p><strong>ISBN:</strong> {book.isbn}</p>
                    <p><strong>Ano de publicação:</strong> {book.publicationYear}</p>
                    <p><strong>Status:</strong> 
                        <span className={`status-badge ${book.available ? 'available' : 'borrowed'}`}>
                            {book.available ? 'Disponível' : 'Emprestado'}
                        </span>
                    </p>
                    {book.totalLoans !== undefined && (
                        <p><strong>Total de empréstimos:</strong> {book.totalLoans}</p>
                    )}
                </div>
            </div>
        </div>
    );
}