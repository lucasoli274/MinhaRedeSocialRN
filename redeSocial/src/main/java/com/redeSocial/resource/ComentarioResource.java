package com.redeSocial.resource;

import com.redeSocial.entity.Comentario;
import com.redeSocial.repository.ComentarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comentario")
public class ComentarioResource {
    @Autowired
    private ComentarioRepository comentarioRepository;

    @GetMapping
    private Iterable<Comentario> getComentarios() {
        return comentarioRepository.findAll();
    }

    @GetMapping("/{publicacaoId}")
    private List<Comentario> getComentariosPorPublicacao(@PathVariable Long publicacaoId) {
        List<Comentario> comentarios = comentarioRepository.findAllByPublicacaoId(publicacaoId);
        return comentarios;
    }

    @PostMapping
    private Comentario postaComentario(@RequestBody Comentario comentario) {
        return comentarioRepository.save(comentario);
    }

    @DeleteMapping("/{id}")
    private void deletaComentario(@PathVariable Long id) {
        comentarioRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    private Comentario editaComentario(@PathVariable Long id, @RequestBody Comentario comentario) {
        comentario.setId(id);
        return comentarioRepository.save(comentario);
    }
}
