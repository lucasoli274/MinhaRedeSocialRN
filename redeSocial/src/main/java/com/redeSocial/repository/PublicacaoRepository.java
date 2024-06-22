package com.redeSocial.repository;

import com.redeSocial.entity.Publicacao;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublicacaoRepository extends CrudRepository<Publicacao, Long> {
    List<Publicacao> findByUsuarioId(Long usuarioId);
    List<Publicacao> findByUsuarioUsuario(String usuario);
}
