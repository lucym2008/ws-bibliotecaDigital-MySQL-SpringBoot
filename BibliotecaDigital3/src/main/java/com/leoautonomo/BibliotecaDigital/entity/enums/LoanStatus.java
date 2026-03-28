package com.leoautonomo.BibliotecaDigital.entity.enums;

public enum LoanStatus {
    ACTIVE,    // 0 - Emprestado, ainda não devolvido
    RETURNED,  // 1 - Devolvido
    OVERDUE    // 2 - Atrasado (pode ser calculado automaticamente)
}