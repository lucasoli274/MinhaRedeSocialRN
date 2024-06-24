package com.redeSocial.repository;

import com.redeSocial.entity.Follow;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends CrudRepository <Follow, Long> {
    List<Follow> findAllByQuemSegueId(Long quemSegueId);
}
