import { db } from './firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const booksData = [
    {
        title: "Dom Casmurro",
        author: "Machado de Assis",
        isbn: "978-85-351-1234-5",
        publicationYear: 1899,
        available: true,
        createdAt: Timestamp.now()
    },
    {
        title: "O Alquimista",
        author: "Paulo Coelho",
        isbn: "978-85-351-5678-9",
        publicationYear: 1988,
        available: true,
        createdAt: Timestamp.now()
    },
    {
        title: "Clean Code",
        author: "Robert C. Martin",
        isbn: "978-85-351-9012-3",
        publicationYear: 2008,
        available: true,
        createdAt: Timestamp.now()
    }
];

export async function seedBooks() {
    const booksCollection = collection(db, 'books');
    
    for (const book of booksData) {
        await addDoc(booksCollection, book);
        console.log(`Livro adicionado: ${book.title}`);
    }
    
    console.log('Seed concluído!');
}