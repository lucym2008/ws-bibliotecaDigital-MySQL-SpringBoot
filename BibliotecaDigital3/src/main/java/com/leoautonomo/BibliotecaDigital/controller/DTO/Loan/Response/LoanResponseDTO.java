package com.leoautonomo.BibliotecaDigital.controller.DTO.Loan.Response;

import com.leoautonomo.BibliotecaDigital.entity.Loan;
import com.leoautonomo.BibliotecaDigital.entity.enums.LoanStatus;
import java.time.LocalDate;
import java.util.UUID;

public record LoanResponseDTO(
        UUID id,
        UUID userId,
        String userName,
        UUID bookId,
        String bookTitle,
        LocalDate loanDate,
        LocalDate dueDate,
        LocalDate returnDate,
        LoanStatus status,
        boolean isOverdue
) {
    public static LoanResponseDTO fromEntity(Loan loan) {
        return new LoanResponseDTO(
                loan.getId(),
                loan.getUser().getId(),
                loan.getUser().getName(),
                loan.getBook().getId(),
                loan.getBook().getTitle(),
                loan.getLoanDate(),
                loan.getDueDate(),
                loan.getReturnDate(),
                loan.getStatus(),
                loan.isOverdue()
        );
    }
}