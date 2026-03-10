package com.stickerwall.backend.service;

import com.stickerwall.backend.dto.NoteRequest;
import com.stickerwall.backend.model.Note;
import com.stickerwall.backend.repository.NoteRepository;
import com.stickerwall.backend.util.Sanitizer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository repo;

    public Note createNote(NoteRequest request, String ipHash) {

        String content = request.getContent();

        // word limit
        if(content.split("\\s+").length > 100){
            throw new RuntimeException("Maximum 100 words allowed");
        }

        // block links
        String lower = content.toLowerCase();
        if(lower.contains("http") || lower.contains("www")){
            throw new RuntimeException("Links are not allowed");
        }

        // sanitize input
        String clean = Sanitizer.clean(content);

        Note note = Note.builder()
                .content(clean)
                .author(request.getAuthor())
                .color(request.getColor())
                .ipHash(ipHash)
                .createdAt(Instant.now())
                .hidden(false)
                .build();

        return repo.save(note);
    }

    public Page<Note> getNotes(int page, int size){

        return repo.findByHiddenFalse(
                PageRequest.of(page,size, Sort.by("createdAt").descending())
        );
    }

    public void hideNote(UUID id){

        Note note = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        note.setHidden(true);

        repo.save(note);
    }

    public long countNotes(){

        return repo.countByHiddenFalse();
    }
}