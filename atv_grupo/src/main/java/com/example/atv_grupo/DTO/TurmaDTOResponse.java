package com.example.atv_grupo.DTO;

import com.example.atv_grupo.Entity.Aluno;
import com.example.atv_grupo.Entity.Professor;
import com.example.atv_grupo.Entity.Turma;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TurmaDTOResponse {

    private Long id;
    private String sigla;
    private int numeroSala;
    private String nome;
    private Professor professor;
    private List<Aluno> alunos;

    // Método que converte de DTO para a entidade Turma
    public Turma toTurma() {
        return new Turma(
                this.id,
                this.sigla,
                this.numeroSala,
                this.nome,
                this.professor,
                this.alunos
        );
    }

    // Método que converte de entidade Turma para DTO de resposta
    public static TurmaDTOResponse fromTurmaResponse(Turma turma) {
        return new TurmaDTOResponse(
                turma.getIdTurma(),
                turma.getSigla(),
                turma.getNumeroSala(),
                turma.getNome(),
                turma.getProfessor(),
                turma.getAlunos()
        );
    }
}
