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
public class Turma implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTurma;
    private String sigla;
    @Column(unique = true)
    private int numeroSala;
    private String nome;

    @ManyToOne
    @JoinColumn(name = "idProfessor", referencedColumnName = "idProfessor")
    private Professor professor;

    @OneToMany(mappedBy = "turma", cascade = CascadeType.ALL)
    private List<Aluno> alunos;

    public Turma(Long idTurma, String sigla, int numeroSala, String nome, Professor professor) {
        this.idTurma = idTurma;
        this.sigla = sigla;
        this.numeroSala = numeroSala;
        this.nome = nome;
        this.professor = professor;
    }
}
