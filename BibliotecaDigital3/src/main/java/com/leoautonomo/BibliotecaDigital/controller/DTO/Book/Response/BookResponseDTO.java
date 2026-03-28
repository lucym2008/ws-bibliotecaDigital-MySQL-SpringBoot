package com.leoautonomo.BibliotecaDigital.controller.DTO.Book.Response;

import com.leoautonomo.BibliotecaDigital.entity.Book;
import java.util.UUID;

public record BookResponseDTO(
        UUID id,
        String title,
        String author,
        String isbn,
        Integer publicationYear,
        Boolean available,
        Integer totalLoans  // Quantidade de empréstimos
) {
    public static BookResponseDTO fromEntity(Book book) {
        return new BookResponseDTO(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getIsbn(),
                book.getPublicationYear(),
                book.getAvailable(),
                book.ge
        );
    }
}