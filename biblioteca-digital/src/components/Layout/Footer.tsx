import React from 'react';
import '../../styles/Footer.css';

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p>📚 Biblioteca Digital - {new Date().getFullYear()}</p>
                <p>Desenvolvido por Leonardo Machado</p>
            </div>
        </footer>
    );
}