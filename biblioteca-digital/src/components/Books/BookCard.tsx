import React, { useState } from 'react';
import type { Book } from '../../types';
import { useAuth } from '../../hook/useAuth';
import { loanService } from '../../services/loanService';


interface BookCardProps {
    book: Book;
    onBorrow?: () => void;
}

export function BookCard({ book, onBorrow }: BookCardProps) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleBorrow = async () => {
        if (!user) {
            alert('Faça login para emprestar livros');
            return;
        }
        
        setLoading(true);
        try {
            await loanService.createLoan(user.uid, book.id!);
            alert('Livro emprestado com sucesso!');
            if (onBorrow) onBorrow();
        } catch (error) {
            console.error('Erro ao emprestar:', error);
            alert('Erro ao emprestar livro');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="book-card">
            <div className="book-card-content">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
                <p className="book-isbn">ISBN: {book.isbn}</p>
                <p className="book-year">Ano: {book.publicationYear}</p>
                <div className="book-status">
                    <span className={`status-badge ${book.available ? 'available' : 'borrowed'}`}>
                        {book.available ? 'Disponível' : 'Emprestado'}
                    </span>
                </div>
                {book.available && user && (
                    <button 
                        className="btn-borrow"
                        onClick={handleBorrow}
                        disabled={loading}
                    >
                        {loading ? 'Processando...' : '📖 Emprestar'}
                    </button>
                )}
            </div>
        </div>
    );
}