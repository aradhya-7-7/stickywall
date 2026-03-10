package com.stickerwall.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Note {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, length = 500)
    private String content;

    private String author;

    private String color;

    private String ipHash;

    private Instant createdAt;

    @Column(nullable = false)
    private boolean hidden = false;
}