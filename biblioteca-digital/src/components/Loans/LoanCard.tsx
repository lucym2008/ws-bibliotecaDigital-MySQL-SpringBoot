import React from 'react';
import './LoanCard.css';
import type { Loan } from '../../types';

interface LoanCardProps {
    loan: Loan;
    onReturn?: (loanId: string, bookId: string) => void;
}

export function LoanCard({ loan, onReturn }: LoanCardProps) {
    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'Não devolvido';
        const date = timestamp.toDate();
        return date.toLocaleDateString('pt-BR');
    };

    const isOverdue = () => {
        if (loan.status !== 'ACTIVE') return false;
        const today = new Date();
        const dueDate = loan.dueDate.toDate();
        return today > dueDate;
    };

    return (
        <div className="loan-card">
            <div className="loan-card-content">
                <h3 className="loan-book-title">{loan.bookTitle || 'Livro'}</h3>
                <p className="loan-book-author">{loan.bookAuthor || 'Autor não informado'}</p>
                
                <div className="loan-dates">
                    <p><strong>📅 Emprestado:</strong> {formatDate(loan.loanDate)}</p>
                    <p><strong>⏰ Devolução:</strong> {formatDate(loan.dueDate)}</p>
                    {loan.returnDate && (
                        <p><strong>✅ Devolvido:</strong> {formatDate(loan.returnDate)}</p>
                    )}
                </div>
                
                <div className="loan-status">
                    {loan.status === 'ACTIVE' ? (
                        <span className={`status-badge ${isOverdue() ? 'overdue' : 'active'}`}>
                            {isOverdue() ? '⚠️ ATRASADO' : '📘 ATIVO'}
                        </span>
                    ) : (
                        <span className="status-badge returned">
                            ✅ DEVOLVIDO
                        </span>
                    )}
                </div>
                
                {loan.status === 'ACTIVE' && onReturn && (
                    <button 
                        className="btn-return"
                        onClick={() => onReturn(loan.id!, loan.bookId)}
                    >
                        Devolver Livro
                    </button>
                )}
            </div>
        </div>
    );
}