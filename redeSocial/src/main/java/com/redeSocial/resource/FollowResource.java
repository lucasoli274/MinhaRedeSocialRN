package com.redeSocial.resource;

import com.redeSocial.entity.Follow;
import com.redeSocial.entity.Usuario;
import com.redeSocial.repository.FollowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/{quemSegueId}/segue/{seguidoId}")
    private ResponseEntity<Boolean> verificaSeSegue(@PathVariable Long quemSegueId, @PathVariable Long seguidoId) {
        Optional<Follow> follow = followRepository.findByQuemSegueIdAndSeguidoId(quemSegueId, seguidoId);
        if (follow.isPresent()) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }

    @GetMapping("/quantosMeSeguem/{id}")
    private long quantosSeguem(@PathVariable Long id) {
        return followRepository.countQuantosSeguidores(id);
    }

    @GetMapping("/quantosSigo/{id}")
    private long quantosSigo(@PathVariable Long id) {
        return followRepository.countQuantosSegue(id);
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
