package com.redeSocial.repository;

import com.redeSocial.entity.Usuario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, Long> {
    Usuario findByUsuario(String usuario);
    boolean existsByUsuario(String usuario);
    boolean existsByEmail(String email);
}
