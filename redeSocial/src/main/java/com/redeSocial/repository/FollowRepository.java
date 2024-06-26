package com.redeSocial.repository;

import com.redeSocial.entity.Follow;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends CrudRepository <Follow, Long> {
    List<Follow> findAllByQuemSegueId(Long quemSegueId);
    Optional<Follow> findByQuemSegueIdAndSeguidoId(Long quemSegueId, Long seguidoId);

    @Query("SELECT COUNT(f) FROM Follow f WHERE f.quemSegue.id = :id")
    long countQuantosSegue(@Param("id") Long id);

    @Query("SELECT COUNT(f) FROM Follow f WHERE f.seguido.id = :id")
    long countQuantosSeguidores(@Param("id") Long id);

}
