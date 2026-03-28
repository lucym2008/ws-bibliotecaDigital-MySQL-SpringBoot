package com.leoautonomo.BibliotecaDigital.service;


import com.leoautonomo.BibliotecaDigital.controller.DTO.Loan.Request.LoanCreateDTO;
import com.leoautonomo.BibliotecaDigital.controller.DTO.Loan.Response.LoanResponseDTO;
import com.leoautonomo.BibliotecaDigital.entity.Book;
import com.leoautonomo.BibliotecaDigital.entity.Loan;
import com.leoautonomo.BibliotecaDigital.entity.User;
import com.leoautonomo.BibliotecaDigital.entity.enums.LoanStatus;
import com.leoautonomo.BibliotecaDigital.exceptions.BookUnavailableException;
import com.leoautonomo.BibliotecaDigital.exceptions.BusinessRuleException;
import com.leoautonomo.BibliotecaDigital.exceptions.LoanLimitExceededException;
import com.leoautonomo.BibliotecaDigital.exceptions.ResourceNotFoundException;
import com.leoautonomo.BibliotecaDigital.repository.BookRepository;
import com.leoautonomo.BibliotecaDigital.repository.LoanRepository;
import com.leoautonomo.BibliotecaDigital.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LoanService {

    private static final int MAX_ACTIVE_LOANS = 3;
    private static final int LOAN_DAYS = 7;

    private final LoanRepository loanRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Transactional
    public LoanResponseDTO createLoan(LoanCreateDTO dto) {
        // 1. Validar usuário
        User user = userRepository.findById(dto.userId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário", dto.userId()));

        // 2. Validar livro
        Book book = bookRepository.findById(dto.bookId())
                .orElseThrow(() -> new ResourceNotFoundException("Livro", dto.bookId()));

        // 3. REGRA: Livro deve estar disponível
        if (!book.getAvailable()) {
            throw new BookUnavailableException(book.getTitle());
        }

        // 4. REGRA: Limite de empréstimos por usuário
        long activeLoans = loanRepository.findByUserId(user.getId()).stream()
                .filter(loan -> loan.getStatus() == LoanStatus.ACTIVE)
                .count();

        if (activeLoans >= MAX_ACTIVE_LOANS) {
            throw new LoanLimitExceededException((int) activeLoans, MAX_ACTIVE_LOANS);
        }

        // 5. Criar empréstimo
        Loan loan = new Loan();
        loan.setUser(user);
        loan.setBook(book);
        loan.setLoanDate(LocalDate.now());
        loan.setStatus(LoanStatus.ACTIVE);

        // 6. Marcar livro como indisponível
        book.setAvailable(false);
        bookRepository.save(book);

        Loan saved = loanRepository.save(loan);
        return LoanResponseDTO.fromEntity(saved);
    }

    @Transactional
    public LoanResponseDTO returnBook(UUID loanId) {
        // 1. Buscar empréstimo
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new ResourceNotFoundException("Empréstimo", loanId));

        // 2. REGRA: Verificar se já foi devolvido
        if (loan.getStatus() == LoanStatus.RETURNED) {
            throw new BusinessRuleException("Este empréstimo já foi devolvido");
        }

        // 3. REGRA: Verificar atraso
        boolean isOverdue = loan.getDueDate().isBefore(LocalDate.now());
        if (isOverdue) {
            loan.setStatus(LoanStatus.OVERDUE);
        } else {
            loan.setStatus(LoanStatus.RETURNED);
        }

        loan.setReturnDate(LocalDate.now());

        // 4. Marcar livro como disponível novamente
        Book book = loan.getBook();
        book.setAvailable(true);
        bookRepository.save(book);

        Loan saved = loanRepository.save(loan);
        return LoanResponseDTO.fromEntity(saved);
    }

    @Transactional(readOnly = true)
    public List<LoanResponseDTO> findLoansByUser(UUID userId) {
        // Verifica se usuário existe
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("Usuário", userId);
        }

        return loanRepository.findByUserId(userId).stream()
                .map(LoanResponseDTO::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<LoanResponseDTO> findActiveLoans() {
        return loanRepository.findByStatus(LoanStatus.ACTIVE).stream()
                .map(LoanResponseDTO::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public LoanResponseDTO findById(UUID id) {
        Loan loan = loanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empréstimo", id));
        return LoanResponseDTO.fromEntity(loan);
    }

    @Transactional
    public void deleteLoan(UUID id) {
        Loan loan = loanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Empréstimo", id));

        // REGRA: Não pode deletar empréstimo ativo
        if (loan.getStatus() == LoanStatus.ACTIVE) {
            throw new BusinessRuleException("Não é possível deletar um empréstimo ativo. Devolva o livro primeiro.");
        }

        loanRepository.delete(loan);
    }
}