package com.example.atv_grupo.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Professor implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProfessor;
    private String nome;
    private String sobrenome;

    @OneToMany(mappedBy = "professor", cascade = CascadeType.ALL)
    private List<Turma> turma;


    public Professor(Long idProfessor, String nome, String sobrenome, List<Turma> turma) {
        this.idProfessor = idProfessor;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.turma = turma;
    }
}
