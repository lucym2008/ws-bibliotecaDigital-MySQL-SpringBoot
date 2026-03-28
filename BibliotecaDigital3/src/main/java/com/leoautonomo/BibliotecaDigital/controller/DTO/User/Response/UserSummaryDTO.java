package com.leoautonomo.BibliotecaDigital.controller.DTO.User.Response;

import java.util.UUID;

public record UserSummaryDTO(
        UUID id,
        String name,
        String email
) {}