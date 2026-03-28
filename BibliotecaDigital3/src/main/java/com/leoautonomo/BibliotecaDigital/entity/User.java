package com.leoautonomo.BibliotecaDigital.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.leoautonomo.BibliotecaDigital.entity.enums.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_user")
@EqualsAndHashCode(of = "id")
@AllArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;
    private LocalDateTime CreatedAt;
    private LocalDateTime UpdatedAt;
    // ✅ Deixe apenas o relacionamento
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Loan> loans = new ArrayList<>();

    public User() {
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                '}';
    }

}
