package com.redeSocial.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false, name = "quem_segue_id")
    private Usuario quemSegue;

    @ManyToOne
    @JoinColumn(nullable = false, name = "seguido_id")
    private Usuario seguido;
}

