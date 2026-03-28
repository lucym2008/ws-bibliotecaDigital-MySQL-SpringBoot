package com.leoautonomo.BibliotecaDigital.controller;

import com.leoautonomo.BibliotecaDigital.controller.DTO.Book.Request.BookCreateDTO;
import com.leoautonomo.BibliotecaDigital.controller.DTO.Book.Response.BookResponseDTO;
import com.leoautonomo.BibliotecaDigital.controller.DTO.Book.Request.BookUpdateDTO;
import com.leoautonomo.BibliotecaDigital.controller.DTO.Book.Response.BookResponseDTO;
import com.leoautonomo.BibliotecaDigital.entity.Book;
import com.leoautonomo.BibliotecaDigital.entity.Book;

import com.leoautonomo.BibliotecaDigital.service.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/books")  // ← MUDEI PARA "/Books" (mais comum que "/biblioteca")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping
    public ResponseEntity<BookResponseDTO> createBook(@Valid @RequestBody BookCreateDTO requestDTO) {
        Book book = requestDTO.toEntity();
        Book saved = bookService.createBook(book);
        BookResponseDTO response = BookResponseDTO.fromEntity(saved);
        return ResponseEntity.created(URI.create("/book/" + response.id())).body(response);
    }

    
    @GetMapping
    public ResponseEntity<List<BookResponseDTO>> listBooks() {
        List<BookResponseDTO> list = bookService.listBooks();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookResponseDTO> findBookById(@PathVariable String id) {
        Book book = bookService.findBookEntityById(UUID.fromString(id));
        var bookFound = BookResponseDTO.fromEntity(book);
        return ResponseEntity.ok(bookFound);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable String id) {
        bookService.deleteById(UUID.fromString(id));
        return ResponseEntity.noContent().build();  // ← Retorna 204 No Content
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookResponseDTO> updateById(
            @PathVariable String id,
            @Valid @RequestBody BookUpdateDTO updateDTO) {  // ← ESSENCIAL!
        BookResponseDTO updated = bookService.updateBookById(UUID.fromString(id), updateDTO);
        return ResponseEntity.ok(updated);
    }
}