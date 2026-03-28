package com.leoautonomo.BibliotecaDigital.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.leoautonomo.BibliotecaDigital.entity.enums.LoanStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "tb_loan")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @Column(nullable = false)
    private LocalDate loanDate;

    private LocalDate returnDate;

    @Enumerated(EnumType.ORDINAL)
    private LoanStatus status;

    // Calcula data de devolução prevista (7 dias após empréstimo)
    public LocalDate getDueDate() {
        return loanDate != null ? loanDate.plusDays(7) : null;
    }

    // Verifica se está atrasado
    public boolean isOverdue() {
        if (status != LoanStatus.ACTIVE) return false;
        return LocalDate.now().isAfter(getDueDate());
    }
}