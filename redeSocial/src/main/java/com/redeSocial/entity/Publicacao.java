package com.redeSocial.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Publicacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 400)
    private String conteudo;

    @Column
    private String data;

    @Column
    private String visibilidade;

    @ManyToOne
    @JoinColumn(name = "usuario", referencedColumnName = "usuario", nullable = false)
    private Usuario usuario;
}
