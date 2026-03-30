package com.leoautonomo.BibliotecaDigital.service;

import com.leoautonomo.BibliotecaDigital.controller.DTO.User.Request.UserUpdateDTO;
import com.leoautonomo.BibliotecaDigital.controller.DTO.User.Response.UserResponseDTO;
import com.leoautonomo.BibliotecaDigital.entity.User;
import com.leoautonomo.BibliotecaDigital.exceptions.NotFoundException;
import com.leoautonomo.BibliotecaDigital.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User findUserEntityById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(id));
    }

    public UserResponseDTO findUserByIdOrThrow(UUID id) {
        User user = findUserEntityById(id);
        return UserResponseDTO.fromEntity(user);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Senha inválida");
        }

        return user;
    }

    @Transactional
    public List<UserResponseDTO> listUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserResponseDTO::fromEntity)
                .toList();
    }

    @Transactional
    public void deleteById(UUID uuid) {
        // Se não existir, já lança exceção
        findUserEntityById(uuid);
        userRepository.deleteById(uuid);
    }

    @Transactional
    public UserResponseDTO updateUserById(UUID uuid, UserUpdateDTO updateDTO) {
        User user = findUserEntityById(uuid);  // ← esse método existe?
        updateDTO.updateEntity(user);
        User updated = userRepository.save(user);
        return UserResponseDTO.fromEntity(updated);
    }
}