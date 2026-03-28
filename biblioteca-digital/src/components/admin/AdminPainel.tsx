import React, { useEffect, useState } from 'react';
import { bookService } from '../../services/bookService';
import { loanService } from '../../services/loanService';
import '../../styles/adminPainel.css';
import type { Book, Loan } from '../../types';

export function AdminPanel() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loans, setLoans] = useState<Loan[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        publicationYear: new Date().getFullYear()
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [booksData, loansData] = await Promise.all([
                bookService.getAllBooks(),
                loanService.getActiveLoans()
            ]);
            setBooks(booksData);
            setLoans(loansData);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            alert('Erro ao carregar dados');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateBook = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await bookService.createBook(formData);
            setShowForm(false);
            setFormData({ title: '', author: '', isbn: '', publicationYear: new Date().getFullYear() });
            await loadData();
            alert('Livro criado com sucesso!');
        } catch (error) {
            alert('Erro ao criar livro');
        }
    };

    const handleDeleteBook = async (id: string) => {
        if (confirm('Tem certeza que deseja deletar este livro?')) {
            try {
                await bookService.deleteBook(id);
                await loadData();
                alert('Livro deletado com sucesso!');
            } catch (error) {
                alert('Erro ao deletar livro');
            }
        }
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return '-';
        const date = timestamp.toDate();
        return date.toLocaleDateString('pt-BR');
    };

    if (loading) return <div className="loading">Carregando dados...</div>;

    return (
        <div className="admin-container">
            <h1 className="page-title">👑 Painel Administrativo</h1>
            
            {/* Seção de Livros */}
            <div className="admin-section">
                <div className="section-header">
                    <h2>📚 Gerenciar Livros</h2>
                    <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Cancelar' : '+ Novo Livro'}
                    </button>
                </div>
                
                {showForm && (
                    <form className="book-form" onSubmit={handleCreateBook}>
                        <input
                            type="text"
                            placeholder="Título"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Autor"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="ISBN"
                            value={formData.isbn}
                            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Ano"
                            value={formData.publicationYear}
                            onChange={(e) => setFormData({ ...formData, publicationYear: parseInt(e.target.value) })}
                            required
                        />
                        <button type="submit" className="btn btn-success">Salvar Livro</button>
                    </form>
                )}
                
                <div className="books-table">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>ISBN</th>
                                <th>Ano</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <tr key={book.id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.isbn}</td>
                                    <td>{book.publicationYear}</td>
                                    <td>
                                        <span className={`status-badge ${book.available ? 'available' : 'borrowed'}`}>
                                            {book.available ? 'Disponível' : 'Emprestado'}
                                        </span>
                                    </td>
                                    <td>
                                        <button 
                                            className="btn-danger-small" 
                                            onClick={() => handleDeleteBook(book.id!)}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {books.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="empty-row">Nenhum livro cadastrado</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Seção de Empréstimos Ativos */}
            <div className="admin-section">
                <h2>📖 Empréstimos Ativos</h2>
                <div className="loans-table">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Livro</th>
                                <th>ID do Usuário</th>
                                <th>Data Empréstimo</th>
                                <th>Devolução Prevista</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map(loan => (
                                <tr key={loan.id}>
                                    <td>{loan.bookTitle || '-'}</td>
                                    <td>{loan.userId.substring(0, 8)}...</td>
                                    <td>{formatDate(loan.loanDate)}</td>
                                    <td>{formatDate(loan.dueDate)}</td>
                                    <td>
                                        <span className="status-badge active">ATIVO</span>
                                    </td>
                                </tr>
                            ))}
                            {loans.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="empty-row">Nenhum empréstimo ativo</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}