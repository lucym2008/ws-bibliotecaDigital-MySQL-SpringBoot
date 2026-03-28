package com.leoautonomo.BibliotecaDigital.controller.DTO.Book.Request;

import jakarta.validation.constraints.*;
import com.leoautonomo.BibliotecaDigital.entity.Book;

public record BookCreateDTO(
        @NotBlank(message = "Título é obrigatório")
        @Size(min = 1, max = 200, message = "Título deve ter entre 1 e 200 caracteres")
        String title,

        @NotBlank(message = "Autor é obrigatório")
        @Size(min = 1, max = 100, message = "Autor deve ter entre 1 e 100 caracteres")
        String author,

        @NotBlank(message = "ISBN é obrigatório")
        @Pattern(regexp = "^[0-9-]{10,17}$", message = "ISBN inválido")
        String isbn,

        @NotNull(message = "Ano de publicação é obrigatório")
        @Min(value = 1000, message = "Ano deve ser maior que 1000")
        @Max(value = 2026, message = "Ano não pode ser futuro")
        Integer publicationYear
) {
        public Book toEntity() {
                Book book = new Book();
                book.setTitle(this.title);
                book.setAuthor(this.author);
                book.setIsbn(this.isbn);
                book.setPublicationYear(this.publicationYear);
                book.setAvailable(true);  // Livro começa disponível
                return book;
        }
}