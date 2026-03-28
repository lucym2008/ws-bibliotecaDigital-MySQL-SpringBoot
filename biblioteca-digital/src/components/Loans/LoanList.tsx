import React from 'react';
import { LoanCard } from './LoanCard';
import './LoanList.css';
import type { Loan } from '../../types';

interface LoanListProps {
    loans: Loan[];
    onReturn?: (loanId: string, bookId: string) => void;
    title?: string;
    emptyMessage?: string;
}

export function LoanList({ loans, onReturn, title, emptyMessage = 'Nenhum empréstimo encontrado' }: LoanListProps) {
    if (loans.length === 0) {
        return (
            <div className="loan-list-empty">
                <p>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="loan-list">
            {title && <h2 className="loan-list-title">{title}</h2>}
            <div className="loan-list-container">
                {loans.map(loan => (
                    <LoanCard key={loan.id} loan={loan} onReturn={onReturn} />
                ))}
            </div>
        </div>
    );
}