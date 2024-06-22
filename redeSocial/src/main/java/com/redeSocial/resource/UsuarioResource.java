package com.redeSocial.resource;

import com.redeSocial.entity.Usuario;
import com.redeSocial.repository.UsuarioRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/usuario")
public class UsuarioResource {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    private Iterable<Usuario> getUsuarios() {
        return usuarioRepository.findAll();
    }

    @GetMapping("/{usuario}")
    private Usuario getByUsuario(@PathVariable String usuario) {
        return usuarioRepository.findByUsuario(usuario);
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<Usuario> cadastraUsuario(@Valid @RequestBody Usuario usuario) {
        try {
            if (usuarioRepository.existsByUsuario(usuario.getUsuario()) || usuarioRepository.existsByEmail(usuario.getEmail()) ) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
            Usuario novoUsuario = usuarioRepository.save(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    private void deletaUsuario(@PathVariable Long id) {
        usuarioRepository.deleteById(id);
    }

    @DeleteMapping("/limpa")
    private void deletaTodos() {
        usuarioRepository.deleteAll();
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        Usuario usuario = usuarioRepository.findByUsuario(request.getUsuario());

        if (usuario != null && usuario.getSenha().equals(request.getSenha())) {
            return ResponseEntity.ok("Login bem sucedido");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
        }
    }

    @Data
    static class LoginRequest {
        private String usuario;
        private String senha;
    }

}
