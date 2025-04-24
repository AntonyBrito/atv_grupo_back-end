package com.example.atv_grupo.DTO;

import com.example.atv_grupo.Entity.Professor;
import com.example.atv_grupo.Entity.Turma;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfessorDTO {

    private Long idProfessor;
    private String nome;
    private String sobrenome;
    private List<Turma> turma;

    public Professor toProfessor(){
        return new Professor(
                this.idProfessor,
                this.nome,
                this.sobrenome,
                this.turma
        );
    }

    public ProfessorDTO fromProfessor(Professor professor){
        return new ProfessorDTO(
                professor.getIdProfessor(),
                professor.getNome(),
                professor.getSobrenome(),
                professor.getTurma()
        );
    }
}
