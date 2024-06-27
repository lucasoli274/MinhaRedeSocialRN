package com.redeSocial.repository;

import com.redeSocial.entity.Publicacao;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublicacaoRepository extends CrudRepository<Publicacao, Long> {
    List<Publicacao> findAllByUsuarioId(Long usuarioId);
    List<Publicacao> findByUsuarioIdIn(List<Long> usuarioIds);
}
