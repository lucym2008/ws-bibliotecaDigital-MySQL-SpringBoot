package com.leoautonomo.BibliotecaDigital.controller.DTO.Loan.Request;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record LoanCreateDTO(
        @NotNull(message = "ID do usuário é obrigatório")
        UUID userId,

        @NotNull(message = "ID do livro é obrigatório")
        UUID bookId
) {}