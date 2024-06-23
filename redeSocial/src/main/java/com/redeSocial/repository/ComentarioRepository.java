package com.redeSocial.repository;

import com.redeSocial.entity.Comentario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComentarioRepository extends CrudRepository<Comentario, Long> {
    List<Comentario>findByPublicacaoId(Long publicacaoId);
}
