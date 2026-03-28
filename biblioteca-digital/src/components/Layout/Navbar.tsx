import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';
import { useAuth } from '../../hook/useAuth';

export function Navbar() {
    const { user, userData, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    📚 Biblioteca Digital
                </Link>
                
                <div className="navbar-links">
                    <Link to="/books" className="nav-link">
                        Livros
                    </Link>
                    
                    {user && userData?.role === 'ADMIN' && (
                        <Link to="/admin" className="nav-link">
                            Admin
                        </Link>
                    )}
                    
                    {user && (
                        <>
                            <Link to="/my-loans" className="nav-link">
                                Meus Empréstimos
                            </Link>
                            <span className="user-name">
                                Olá, {userData?.name || user.email?.split('@')[0]}
                            </span>
                            <button onClick={logout} className="btn-logout">
                                Sair
                            </button>
                        </>
                    )}
                    
                    {!user && (
                        <>
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                            <Link to="/register" className="nav-link btn-register">
                                Cadastrar
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}