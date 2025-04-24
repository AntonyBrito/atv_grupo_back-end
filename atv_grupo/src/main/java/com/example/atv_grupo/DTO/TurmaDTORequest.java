package com.example.atv_grupo.DTO;

import com.example.atv_grupo.Entity.Aluno;
import com.example.atv_grupo.Entity.Professor;
import com.example.atv_grupo.Entity.Turma;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TurmaDTORequest {
    private Long id;
    private String sigla;
    private int numeroSala;
    private String nome;
    private Professor professor;


    public Turma toTurmaRequest(){
        return new Turma(
                this.id,
                this.sigla,
                this.numeroSala,
                this.nome,
                this.professor
        );
    }

    public TurmaDTORequest fromTurmaRequest(Turma turma){
        return new TurmaDTORequest(
                turma.getIdTurma(),
                turma.getSigla(),
                turma.getNumeroSala(),
                turma.getNome(),
                turma.getProfessor()
        );
    }
}
