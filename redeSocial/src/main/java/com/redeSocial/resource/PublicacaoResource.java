package com.redeSocial.resource;

import com.redeSocial.entity.Publicacao;
import com.redeSocial.repository.PublicacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
public class PublicacaoResource {
    @Autowired
    private PublicacaoRepository publicacaoRepository;

    @GetMapping
    private Iterable<Publicacao> getPosts() {
        return publicacaoRepository.findAll();
    }

    @GetMapping("/{usuario}")
    private List<Publicacao> getPostsByIdDeUsuario(@PathVariable String usuario) {
        return publicacaoRepository.findByUsuarioUsuario(usuario);
    }

    @PostMapping
    private Publicacao novoPost(@RequestBody Publicacao publicacao) {
        return publicacaoRepository.save(publicacao);
    }

    @DeleteMapping("/{id}")
    private void deletaPost(@PathVariable Long id) {
        publicacaoRepository.deleteById(id);
    }
}
