package com.leoautonomo.BibliotecaDigital.exceptions;

import com.leoautonomo.BibliotecaDigital.exceptions.BusinessException;

public class BusinessRuleException extends BusinessException {

    public BusinessRuleException(String message) {
        super(message);
    }
}