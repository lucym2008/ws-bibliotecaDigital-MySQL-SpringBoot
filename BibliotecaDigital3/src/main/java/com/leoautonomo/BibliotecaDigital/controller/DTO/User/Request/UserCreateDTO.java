package com.leoautonomo.BibliotecaDigital.controller.DTO.User.Request;


import com.leoautonomo.BibliotecaDigital.entity.User;
import com.leoautonomo.BibliotecaDigital.entity.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.antlr.v4.runtime.misc.NotNull;

public record UserCreateDTO (
        @NotBlank(message = "Nome é obrigatório")
        @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
        String name,

        @NotBlank(message = "Email é obrigatório")
        @Email(message = "Email inválido")
        String email,

        @NotBlank(message = "Senha é obrigatória")
        @Size(min = 6, max = 50, message = "Senha deve ter entre 6 e 50 caracteres")
        String password,

        @NotNull()
        UserRole role
) {
        // Converte DTO → Entidade
        public User toEntity() {
                User user = new User();
                user.setName(this.name);
                user.setEmail(this.email);
                user.setPassword(this.password);
                user.setRole(this.role);
                return user;
        }
}