package com.leoautonomo.BibliotecaDigital.controller;

import com.leoautonomo.BibliotecaDigital.controller.DTO.User.Request.UserCreateDTO;
import com.leoautonomo.BibliotecaDigital.controller.DTO.User.Request.UserUpdateDTO;
import com.leoautonomo.BibliotecaDigital.controller.DTO.User.Response.UserResponseDTO;
import com.leoautonomo.BibliotecaDigital.entity.User;
import com.leoautonomo.BibliotecaDigital.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/users")  // ← MUDEI PARA "/users" (mais comum que "/biblioteca")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody UserCreateDTO requestDTO) {
        User user = requestDTO.toEntity();
        User saved = userService.createUser(user);
        UserResponseDTO response = UserResponseDTO.fromEntity(saved);
        return ResponseEntity.created(URI.create("/users/" + response.id())).body(response);
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> listUsers() {
        List<UserResponseDTO> list = userService.listUsers();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> findUserById(@PathVariable String id) {
        UserResponseDTO user = userService.findUserByIdOrThrow(UUID.fromString(id));
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable String id) {
        userService.deleteById(UUID.fromString(id));
        return ResponseEntity.noContent().build();  // ← Retorna 204 No Content
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateById(
            @PathVariable String id,
            @Valid @RequestBody UserUpdateDTO updateDTO) {  // ← ESSENCIAL!
        UserResponseDTO updated = userService.updateUserById(UUID.fromString(id), updateDTO);
        return ResponseEntity.ok(updated);
    }
}