package com.leoautonomo.BibliotecaDigital.exceptions;

import com.leoautonomo.BibliotecaDigital.exceptions.BusinessRuleException;

public class LoanLimitExceededException extends BusinessRuleException {

    public LoanLimitExceededException(int currentLoans, int maxLoans) {
        super(String.format("Usuário já possui %d empréstimos ativos. Limite máximo é %d.", currentLoans, maxLoans));
    }
}