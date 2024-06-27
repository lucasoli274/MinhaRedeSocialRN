package com.redeSocial.resource;

import com.redeSocial.entity.Publicacao;
import com.redeSocial.repository.FollowRepository;
import com.redeSocial.repository.PublicacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
public class PublicacaoResource {
    @Autowired
    private PublicacaoRepository publicacaoRepository;

    @Autowired
    private FollowRepository followRepository;

    @GetMapping
    private Iterable<Publicacao> getPosts() {
        return publicacaoRepository.findAll();
    }

    @GetMapping("/{id}")
    private List<Publicacao> getPostsByIdDeUsuario(@PathVariable Long id) {
        List<Publicacao> publicacoes = publicacaoRepository.findAllByUsuarioId(id);
        return publicacoes;
    }

    @GetMapping("/dosQueSigo/{usuarioId}")
    private ResponseEntity<List<Publicacao>> getPublicacoesByUsuarioSeguido(@PathVariable Long usuarioId) {
        List<Long> seguidosIds = followRepository.findSeguidosIdsByUsuarioId(usuarioId);
        seguidosIds.add(usuarioId); // Incluir o próprio usuário para ver suas próprias publicações
        List<Publicacao> publicacoes = publicacaoRepository.findByUsuarioIdIn(seguidosIds);
        return ResponseEntity.ok(publicacoes);
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
