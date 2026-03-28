package com.leoautonomo.BibliotecaDigital.controller.DTO.Book.Response;

import com.leoautonomo.BibliotecaDigital.entity.Book;
import java.util.UUID;

public record BookSummaryDTO(
        UUID id,
        String title,
        String author,
        Boolean available
) {
    public static BookSummaryDTO fromEntity(Book book) {
        return new BookSummaryDTO(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getAvailable()
        );
    }
}