package com.leoautonomo.BibliotecaDigital.controller.DTO.Book.Response;

import com.leoautonomo.BibliotecaDigital.entity.Book;
import com.leoautonomo.BibliotecaDigital.entity.Loan;

import java.util.List;
import java.util.UUID;

public record BookResponseDTO(
        UUID id,
        String title,
        String author,
        String isbn,
        Integer publicationYear,
        Boolean available,
        List<Loan> Loans  // Quantidade de empréstimos
) {
    public static BookResponseDTO fromEntity(Book book) {
        return new BookResponseDTO(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getIsbn(),
                book.getPublicationYear(),
                book.getAvailable(),
                book.getLoans()
        );
    }
}