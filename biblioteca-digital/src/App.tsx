import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { BookList } from './components/Books/BookList';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { MyLoans } from './components/Loans/MyLoans';

import './styles/global.css';
import { useAuth } from './hook/useAuth';
import { AdminPanel } from './components/admin/AdminPainel';

function PrivateRoute({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
    const { user, loading } = useAuth();
    
    if (loading) return <div className="loading">Carregando...</div>;
    if (!user) return <Navigate to="/login" />;
    if (adminOnly && user.role !== 'ADMIN') return <Navigate to="/" />;
    
    return <>{children}</>;
}

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-loans" element={
                <PrivateRoute>
                    <MyLoans />
                </PrivateRoute>
            } />
            <Route path="/admin" element={
                <PrivateRoute adminOnly>
                    <AdminPanel />
                </PrivateRoute>
            } />
        </Routes>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="app">
                    <Navbar />
                    <main className="container">
                        <AppRoutes />
                    </main>
                    <Footer />
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;