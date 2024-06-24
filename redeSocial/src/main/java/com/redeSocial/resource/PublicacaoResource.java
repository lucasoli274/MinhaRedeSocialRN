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

    @GetMapping("/{id}")
    private List<Publicacao> getPostsByIdDeUsuario(@PathVariable Long id) {
        List<Publicacao> publicacoes = publicacaoRepository.findAllByUsuarioId(id);
        return publicacoes;
    }

    @PostMapping
    private Publicacao novoPost(@RequestBody Publicacao publicacao) {
        return publicacaoRepository.save(publicacao);
    }

    @DeleteMapping("/{id}")
    private void deletaPost(@PathVariable Long id) {
        publicacaoRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    private Publicacao editaPost(@PathVariable Long id, @RequestBody Publicacao publicacao) {
        publicacao.setId(id);
        return publicacaoRepository.save(publicacao);
    }
}
