package com.example.atv_grupo.Repository;

import com.example.atv_grupo.Entity.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    List<Professor> findAllByNome(String nome);
}
