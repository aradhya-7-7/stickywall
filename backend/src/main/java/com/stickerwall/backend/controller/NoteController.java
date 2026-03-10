package com.stickerwall.backend.controller;

import com.stickerwall.backend.dto.NoteRequest;
import com.stickerwall.backend.model.Note;
import com.stickerwall.backend.service.NoteService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.util.UUID;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4173")
public class NoteController {

    private final NoteService service;

    @PostMapping
    public Note create(
            @Valid @RequestBody NoteRequest request,
            HttpServletRequest http
    ){

        String ip = http.getRemoteAddr();
        String hash = hashIp(ip);

        return service.createNote(request,hash);
    }

    @GetMapping
    public Page<Note> getNotes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size
    ){

        return service.getNotes(page,size);
    }

    @PatchMapping("/{id}/hide")
    public void hideNote(@PathVariable UUID id){

        service.hideNote(id);
    }

    @GetMapping("/count")
    public long count(){

        return service.countNotes();
    }

    private String hashIp(String ip){

        try{

            MessageDigest md = MessageDigest.getInstance("SHA-256");

            byte[] hash = md.digest(ip.getBytes());

            StringBuilder hex = new StringBuilder();

            for(byte b : hash){

                String s = Integer.toHexString(0xff & b);

                if(s.length() == 1) hex.append('0');

                hex.append(s);
            }

            return hex.toString();

        }catch(Exception e){

            return "unknown";

        }
    }
}