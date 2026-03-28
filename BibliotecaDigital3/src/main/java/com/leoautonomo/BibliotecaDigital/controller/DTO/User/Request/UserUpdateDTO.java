package com.leoautonomo.BibliotecaDigital.controller.DTO.User.Request;

import com.leoautonomo.BibliotecaDigital.entity.User;
import com.leoautonomo.BibliotecaDigital.entity.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UserUpdateDTO(
        @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
        String name,

        @Email(message = "Email inválido")
        String email,

        @Size(min = 6, max = 50, message = "Senha deve ter entre 6 e 50 caracteres")
        String password,

        UserRole role
) {
    // Atualiza apenas os campos que vieram preenchidos no DTO
    public void updateEntity(User user) {
        if (this.name != null && !this.name.isBlank()) {
            user.setName(this.name);
        }
        if (this.email != null && !this.email.isBlank()) {
            user.setEmail(this.email);
        }
        if (this.password != null && !this.password.isBlank()) {
            user.setPassword(this.password);
        }
        if (this.role != null) {
            user.setRole(this.role);
        }
    }
}