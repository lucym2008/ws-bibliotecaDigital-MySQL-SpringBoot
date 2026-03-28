package com.leoautonomo.BibliotecaDigital.exceptions;

import java.util.UUID;

public class NotFoundException extends RuntimeException {

    public NotFoundException(UUID id) {
        super("Objeto não encontrado com ID: " + id);
    }
}