package com.example.atv_grupo.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @JsonIgnoreProperties("professor")
    private List<Turma> turma;
}
