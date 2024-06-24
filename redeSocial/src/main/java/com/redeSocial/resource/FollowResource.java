package com.redeSocial.resource;

import com.redeSocial.entity.Follow;
import com.redeSocial.repository.FollowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seguir")
public class FollowResource {
    @Autowired
    private FollowRepository followRepository;

    @GetMapping
    private Iterable<Follow> getSeguindo() {
        return followRepository.findAll();
    }

    @GetMapping("/{quemSegueId}")
    private List<Follow> getSeguidosPorUsuario(@PathVariable Long quemSegueId) {
        List<Follow> follows = followRepository.findAllByQuemSegueId(quemSegueId);
        return follows;
    }

    @PostMapping
    private Follow comecaASeguir(@RequestBody Follow follow) {
        return followRepository.save(follow);
    }

    @DeleteMapping("/{id}")
    private void deixaDeSeguir(@PathVariable Long id) {
        followRepository.deleteById(id);
    }
}
