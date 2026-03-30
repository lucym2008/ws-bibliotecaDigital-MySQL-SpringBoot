package com.leoautonomo.BibliotecaDigital.controller.DTO.User.Request;

public record LoginDTO(
        String email,
        String password
) {}