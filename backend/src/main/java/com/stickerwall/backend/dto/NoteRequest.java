package com.stickerwall.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class NoteRequest {

    @NotBlank(message = "Content cannot be empty")
    @Size(max = 500, message = "Note must be under 500 characters")
    private String content;

    @Size(max = 100, message = "Author name too long")
    private String author;

    private String color;
}