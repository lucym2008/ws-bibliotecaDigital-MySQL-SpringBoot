package com.leoautonomo.BibliotecaDigital.exceptions;

public class ResourceNotFoundException extends BusinessException {

    public ResourceNotFoundException(String resource, Object id) {
        super(String.format("%s não encontrado com ID: %s", resource, id));
    }

    public ResourceNotFoundException(String message) {
        super(message);
    }
}