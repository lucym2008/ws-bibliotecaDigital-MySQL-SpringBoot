package com.leoautonomo.BibliotecaDigital.repository;

import com.leoautonomo.BibliotecaDigital.entity.Loan;
import com.leoautonomo.BibliotecaDigital.entity.enums.LoanStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LoanRepository extends JpaRepository<Loan, UUID> {

    List<Loan> findByUserId(UUID userId);

    List<Loan> findByBookId(UUID bookId);

    List<Loan> findByStatus(LoanStatus status);

    boolean existsByBookIdAndStatus(UUID bookId, LoanStatus status);
}