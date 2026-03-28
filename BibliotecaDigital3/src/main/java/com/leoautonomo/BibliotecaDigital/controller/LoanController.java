package com.leoautonomo.BibliotecaDigital.controller;

import com.leoautonomo.BibliotecaDigital.controller.DTO.Loan.Request.LoanCreateDTO;
import com.leoautonomo.BibliotecaDigital.controller.DTO.Loan.Response.LoanResponseDTO;
import com.leoautonomo.BibliotecaDigital.service.LoanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/loans")
@RequiredArgsConstructor
public class LoanController {

    private final LoanService loanService;

    @PostMapping
    public ResponseEntity<LoanResponseDTO> createLoan(@Valid @RequestBody LoanCreateDTO dto) {
        LoanResponseDTO created = loanService.createLoan(dto);
        return ResponseEntity.created(URI.create("/loans/" + created.id())).body(created);
    }

    @PutMapping("/{id}/return")
    public ResponseEntity<LoanResponseDTO> returnBook(@PathVariable UUID id) {
        LoanResponseDTO returned = loanService.returnBook(id);
        return ResponseEntity.ok(returned);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LoanResponseDTO>> getLoansByUser(@PathVariable UUID userId) {
        return ResponseEntity.ok(loanService.findLoansByUser(userId));
    }

    @GetMapping("/active")
    public ResponseEntity<List<LoanResponseDTO>> getActiveLoans() {
        return ResponseEntity.ok(loanService.findActiveLoans());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanResponseDTO> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(loanService.findById(id));
    }
}