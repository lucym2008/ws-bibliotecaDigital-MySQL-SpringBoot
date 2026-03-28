import React, { useEffect, useState } from 'react';;

import './MyLoans.css';
import { useAuth } from '../../hook/useAuth';
import type { Loan } from '../../types';
import { loanService } from '../../services/loanService';


export function MyLoans() {
    const { user } = useAuth();
    const [loans, setLoans] = useState<Loan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            loadLoans();
        }
    }, [user]);

    const loadLoans = async () => {
        try {
            const data = await loanService.getLoansByUser(user!.uid);
            setLoans(data);
        } catch (err) {
            setError('Erro ao carregar empréstimos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleReturn = async (loanId: string, bookId: string) => {
        try {
            await loanService.returnBook(loanId, bookId);
            loadLoans(); // Recarrega a lista
            alert('Livro devolvido com sucesso!');
        } catch (err) {
            alert('Erro ao devolver livro');
        }
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'Não devolvido';
        const date = timestamp.toDate();
        return date.toLocaleDateString('pt-BR');
    };

    const isOverdue = (dueDate: any) => {
        const today = new Date();
        const due = dueDate.toDate();
        return today > due;
    };

    if (loading) return <div className="loading">Carregando seus empréstimos...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="my-loans-container">
            <h1 className="page-title">📖 Meus Empréstimos</h1>
            
            {loans.length === 0 ? (
                <div className="empty-state">
                    <p>Você não tem nenhum empréstimo.</p>
                    <p>Visite o <a href="/books">acervo de livros</a> para fazer um empréstimo!</p>
                </div>
            ) : (
                <div className="loans-list">
                    {loans.map(loan => (
                        <div key={loan.id} className="loan-card">
                            <div className="loan-card-content">
                                <h3 className="loan-book-title">{loan.bookTitle || 'Livro'}</h3>
                                <p className="loan-book-author">{loan.bookAuthor || 'Autor não informado'}</p>
                                
                                <div className="loan-dates">
                                    <p><strong>📅 Emprestado em:</strong> {formatDate(loan.loanDate)}</p>
                                    <p><strong>⏰ Devolução prevista:</strong> {formatDate(loan.dueDate)}</p>
                                    {loan.returnDate && (
                                        <p><strong>✅ Devolvido em:</strong> {formatDate(loan.returnDate)}</p>
                                    )}
                                </div>
                                
                                <div className="loan-status">
                                    {loan.status === 'ACTIVE' ? (
                                        <span className={`status-badge ${isOverdue(loan.dueDate) ? 'overdue' : 'active'}`}>
                                            {isOverdue(loan.dueDate) ? '⚠️ ATRASADO' : '📘 ATIVO'}
                                        </span>
                                    ) : (
                                        <span className="status-badge returned">
                                            ✅ DEVOLVIDO
                                        </span>
                                    )}
                                </div>
                                
                                {loan.status === 'ACTIVE' && (
                                    <button 
                                        className="btn-return"
                                        onClick={() => handleReturn(loan.id!, loan.bookId)}
                                    >
                                        Devolver Livro
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}