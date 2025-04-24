package com.example.atv_grupo.Service;

import com.example.atv_grupo.DTO.ProfessorDTO;
import com.example.atv_grupo.Entity.Professor;
import com.example.atv_grupo.Repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    public List<Professor> getAll() {
        return professorRepository.findAll();
    }// fim getall

    public List<Professor> getAllByName(String nome){
        return professorRepository.findAllByNome(nome);
    }//fim getall by nome

    public Optional<ProfessorDTO> getById(Long idProfessor){
        Optional<Professor> optionalProfessor = professorRepository.findById(idProfessor);
        if(optionalProfessor.isPresent()){
            ProfessorDTO professorDTO = new ProfessorDTO();
            return Optional.of(professorDTO.fromProfessor(optionalProfessor.get()));
        }else {
            return Optional.empty();
        }
    }//fim getby id

    public ProfessorDTO create(ProfessorDTO professorDTO){
        Professor professor = professorDTO.toProfessor();
        professor = professorRepository.save(professor);
        return professorDTO.fromProfessor(professor);
    }//fim update

    public Optional<ProfessorDTO> update(Long id, ProfessorDTO professorDTO){
        Optional<Professor> professorOptional = professorRepository.findById(id);
        if(professorOptional.isPresent()){
            Professor professor = professorOptional.get();
            professor.setNome(professorDTO.getNome());
            professor.setSobrenome(professorDTO.getSobrenome());
            professor.setTurma(professorDTO.getTurma());

            professor = professorRepository.save(professor);

            return Optional.of(professorDTO.fromProfessor(professor));
        }else{
            return Optional.empty();
        }
    }//fim do update

    public boolean delete(Long id){
        if(professorRepository.existsById(id)){
            professorRepository.deleteById(id);
            return true;
        }else {
            return false;
        }
    }
}
