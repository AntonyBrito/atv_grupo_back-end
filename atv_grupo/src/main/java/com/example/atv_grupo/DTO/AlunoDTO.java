package com.example.atv_grupo.DTO;

import com.example.atv_grupo.Entity.Aluno;
import com.example.atv_grupo.Entity.Turma;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlunoDTO {

    private Long idAluno;
    private String nome;
    private String cpf;
    private Turma turma;

    public Aluno toAluno(){
        return new Aluno(
                this.idAluno,
                this.nome,
                this.cpf,
                this.turma
        );
    }

    public AlunoDTO fromAlunoDTO(Aluno aluno){
        return new AlunoDTO(
                aluno.getIdAluno(),
                aluno.getNome(),
                aluno.getCpf(),
                aluno.getTurma()
        );
    }
}
