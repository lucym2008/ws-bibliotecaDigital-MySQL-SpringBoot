package com.leoautonomo.BibliotecaDigital.controller.DTO.User.Response;

import com.leoautonomo.BibliotecaDigital.entity.User;
import com.leoautonomo.BibliotecaDigital.entity.enums.UserRole;
import java.time.LocalDateTime;
import java.util.UUID;

public record UserResponseDTO(
        UUID id,
        String name,
        String email,
        UserRole role,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static UserResponseDTO fromEntity(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}