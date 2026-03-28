package com.leoautonomo.BibliotecaDigital.service;

import com.leoautonomo.BibliotecaDigital.controller.DTO.Book.Request.BookUpdateDTO;
import com.leoautonomo.BibliotecaDigital.controller.DTO.Book.Response.BookResponseDTO;
import com.leoautonomo.BibliotecaDigital.entity.Book;
import com.leoautonomo.BibliotecaDigital.exceptions.NotFoundException;
import com.leoautonomo.BibliotecaDigital.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class BookService {

    @Autowired
    private BookRepository BookRepository;

    @Transactional
    public Book createBook(Book Book) {
        return BookRepository.save(Book);
    }

    public Book findBookEntityById(UUID id) {
        return BookRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(id));
    }

    @Transactional
    public List<BookResponseDTO> listBooks() {
        return BookRepository.findAll()
                .stream()
                .map(BookResponseDTO::fromEntity)
                .toList();
    }

    public void deleteById(UUID uuid) {
        // Se não existir, já lança exceção
        findBookEntityById(uuid);
        BookRepository.deleteById(uuid);
    }

    @Transactional
    public BookResponseDTO updateBookById(UUID uuid, BookUpdateDTO updateDTO) {
        Book Book = findBookEntityById(uuid);  // ← esse método existe?
        updateDTO.updateEntity(Book);
        Book updated = BookRepository.save(Book);
        return BookResponseDTO.fromEntity(updated);
    }


}