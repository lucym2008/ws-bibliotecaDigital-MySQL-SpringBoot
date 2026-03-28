package com.leoautonomo.BibliotecaDigital.service;

import com.leoautonomo.BibliotecaDigital.entity.Book;
import com.leoautonomo.BibliotecaDigital.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    /*
    @Transactional
    public MapperBook createBook(Book book) {
        var bookEnt = bookRepository.save(book);
        return bookToResponse(bookEnt);
    }*/


}
