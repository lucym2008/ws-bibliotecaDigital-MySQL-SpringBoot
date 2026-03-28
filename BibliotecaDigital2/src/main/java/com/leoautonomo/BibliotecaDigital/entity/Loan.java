package com.leoautonomo.BibliotecaDigital.entity;

import com.leoautonomo.BibliotecaDigital.entity.enums.LoanStatus;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "tb_book")
@EqualsAndHashCode(of = "id")
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private LocalDate loanDate;
    private LocalDate returnDate;
    private LoanStatus status;

    public Loan() {
    }

    public Loan(UUID id, LocalDate loanDate, LocalDate returnDate, LoanStatus status) {
        this.id = id;
        this.loanDate = loanDate;
        this.returnDate = returnDate;
        this.status = status;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public LocalDate getLoanDate() {
        return loanDate;
    }

    public void setLoanDate(LocalDate loanDate) {
        this.loanDate = loanDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public LoanStatus getStatus() {
        return status;
    }

    public void setStatus(LoanStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Loan{" +
                "id=" + id +
                ", loanDate=" + loanDate +
                ", returnDate=" + returnDate +
                ", status=" + status +
                '}';
    }

}
