-- ==========================================
-- LIMPA DADOS EXISTENTES
-- ==========================================
DELETE FROM tb_loan;
DELETE FROM tb_book;
DELETE FROM tb_user;

-- ==========================================
-- INSERE USUÁRIOS (role: 'ADMIN' ou 'USER')
-- ==========================================
INSERT INTO tb_user (id, name, email, password, role) VALUES
                                                          ('550e8400-e29b-41d4-a716-446655440000', 'Admin', 'admin@biblioteca.com', 'admin123', 'ADMIN'),
                                                          ('550e8400-e29b-41d4-a716-446655440001', 'João Silva', 'joao@email.com', '123456', 'USER'),
                                                          ('550e8400-e29b-41d4-a716-446655440002', 'Maria Souza', 'maria@email.com', '123456', 'USER');

-- ==========================================
-- INSERE LIVROS
-- ==========================================
INSERT INTO tb_book (id, title, author, isbn, publication_year, available) VALUES
                                                                               ('660e8400-e29b-41d4-a716-446655440000', 'Dom Casmurro', 'Machado de Assis', '978-85-351-1234-5', 1899, true),
                                                                               ('660e8400-e29b-41d4-a716-446655440001', 'O Alquimista', 'Paulo Coelho', '978-85-351-5678-9', 1988, true),
                                                                               ('660e8400-e29b-41d4-a716-446655440002', 'Clean Code', 'Robert C. Martin', '978-85-351-9012-3', 2008, true),
                                                                               ('660e8400-e29b-41d4-a716-446655440003', 'Java para Iniciantes', 'Herbert Schildt', '978-85-351-3456-7', 2020, true);

-- ==========================================
-- INSERE EMPRÉSTIMOS (USANDO return_date, NÃO due_date)
-- ==========================================
INSERT INTO tb_loan (id, user_id, book_id, loan_date, return_date, status) VALUES
                                                                               ('770e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440000', '2026-03-20', '2026-03-27', 0),
                                                                               ('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '2026-03-21', '2026-03-28', 0),
                                                                               ('770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', '2026-03-15', '2026-03-22', 1);