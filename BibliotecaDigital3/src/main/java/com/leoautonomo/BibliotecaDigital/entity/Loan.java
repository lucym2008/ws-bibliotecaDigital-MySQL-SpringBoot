package com.leoautonomo.BibliotecaDigital.entity;

import com.leoautonomo.BibliotecaDigital.entity.enums.LoanStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "tb_loan")
@EqualsAndHashCode(of = "id")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // ← ADICIONE ESTE RELACIONAMENTO
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // ← ADICIONE ESTE RELACIONAMENTO
    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    private LocalDate loanDate;
    private LocalDate returnDate;

    @Enumerated(EnumType.ORDINAL)
    private LoanStatus status;

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
