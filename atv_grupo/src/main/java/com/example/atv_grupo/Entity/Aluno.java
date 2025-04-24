package com.example.atv_grupo.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Aluno implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAluno;
    private String nome;
    @Column(unique = true)
    private String cpf;

    @ManyToOne
    @JoinColumn(name = "idCurso", referencedColumnName = "idCurso")
    @JsonIgnoreProperties("alunos")
    private Turma turma;
}
