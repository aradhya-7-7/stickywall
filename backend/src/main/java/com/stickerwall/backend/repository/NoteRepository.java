package com.stickerwall.backend.repository;

import com.stickerwall.backend.model.Note;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NoteRepository extends JpaRepository<Note, UUID> {

    Page<Note> findByHiddenFalse(Pageable pageable);

    long countByHiddenFalse();
}