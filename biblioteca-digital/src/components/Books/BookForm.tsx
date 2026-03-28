import React, { useState } from 'react';

import './BookForm.css';
import type { Book } from '../../types';

interface BookFormProps {
    onSubmit: (book: Omit<Book, 'id'>) => void;
    initialData?: Partial<Book>;
    buttonText?: string;
}

export function BookForm({ onSubmit, initialData = {}, buttonText = 'Salvar' }: BookFormProps) {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        author: initialData.author || '',
        isbn: initialData.isbn || '',
        publicationYear: initialData.publicationYear || new Date().getFullYear()
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="book-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Título *</label>
                <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="author">Autor *</label>
                <input
                    type="text"
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="isbn">ISBN *</label>
                <input
                    type="text"
                    id="isbn"
                    value={formData.isbn}
                    onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                    required
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="publicationYear">Ano de Publicação *</label>
                <input
                    type="number"
                    id="publicationYear"
                    value={formData.publicationYear}
                    onChange={(e) => setFormData({ ...formData, publicationYear: parseInt(e.target.value) })}
                    min="1000"
                    max={new Date().getFullYear()}
                    required
                />
            </div>
            
            <button type="submit" className="btn btn-primary">
                {buttonText}
            </button>
        </form>
    );
}