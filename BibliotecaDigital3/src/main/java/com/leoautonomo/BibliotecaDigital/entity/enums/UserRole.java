package com.leoautonomo.BibliotecaDigital.entity.enums;

public enum UserRole {
    ADMIN,
    USER;

    // Método útil para verificar se é admin
    public boolean isAdmin() {
        return this == ADMIN;
    }
}