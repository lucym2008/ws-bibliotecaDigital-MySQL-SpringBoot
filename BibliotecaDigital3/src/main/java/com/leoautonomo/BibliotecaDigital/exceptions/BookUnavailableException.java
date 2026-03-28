package com.leoautonomo.BibliotecaDigital.exceptions;

import com.leoautonomo.BibliotecaDigital.exceptions.BusinessRuleException;

public class BookUnavailableException extends BusinessRuleException {

    public BookUnavailableException(String bookTitle) {
        super(String.format("Livro '%s' não está disponível para empréstimo.", bookTitle));
    }
}