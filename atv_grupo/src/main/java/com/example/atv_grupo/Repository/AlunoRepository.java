package com.example.atv_grupo.Repository;

import com.example.atv_grupo.Entity.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    List<Aluno> findAllByNome(String nome);
}
