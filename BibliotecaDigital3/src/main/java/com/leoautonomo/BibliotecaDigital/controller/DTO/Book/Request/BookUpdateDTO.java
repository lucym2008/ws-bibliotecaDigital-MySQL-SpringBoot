package com.leoautonomo.BibliotecaDigital.controller.DTO.Book.Request;

import com.leoautonomo.BibliotecaDigital.entity.Book;
import jakarta.validation.constraints.*;

public record BookUpdateDTO(
        @Size(min = 1, max = 200, message = "Título deve ter entre 1 e 200 caracteres")
        String title,

        @Size(min = 1, max = 100, message = "Autor deve ter entre 1 e 100 caracteres")
        String author,

        @Pattern(regexp = "^[0-9-]{10,17}$", message = "ISBN inválido")
        String isbn,

        @Min(value = 1000, message = "Ano deve ser maior que 1000")
        @Max(value = 2026, message = "Ano não pode ser futuro")
        Integer publicationYear,

        Boolean available
) {
    public void updateEntity(Book book) {
        if (title != null && !title.isBlank()) {
            book.setTitle(title);
        }
        if (author != null && !author.isBlank()) {
            book.setAuthor(author);
        }
        if (isbn != null && !isbn.isBlank()) {
            book.setIsbn(isbn);
        }
        if (publicationYear != null) {
            book.setPublicationYear(publicationYear);
        }
        if (available != null) {
            book.setAvailable(available);
        }
    }
}