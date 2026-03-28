package com.leoautonomo.BibliotecaDigital.service;

import com.leoautonomo.BibliotecaDigital.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /*public UUID createUser(UserResponseDto userDto) {
        User users2ep222222222222222222222
        userRepository.saveAllAndFlush(user);
    }*/

}
