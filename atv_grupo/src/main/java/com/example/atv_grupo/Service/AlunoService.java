package com.example.atv_grupo.Service;

import com.example.atv_grupo.DTO.AlunoDTO;
import com.example.atv_grupo.Entity.Aluno;
import com.example.atv_grupo.Repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    public List<Aluno> getAll() {
        return alunoRepository.findAll();
    }// fim getall

    public List<Aluno> getAllByName(String nome){
        return alunoRepository.findAllByNome(nome);
    }//fim getall by nome

    public Optional<AlunoDTO> getById(Long idAluno){
        Optional<Aluno> optionalAluno = alunoRepository.findById(idAluno);
        if(optionalAluno.isPresent()){
            AlunoDTO alunoDTO = new AlunoDTO();
            return Optional.of(alunoDTO.fromAlunoDTO(optionalAluno.get()));
        }else {
            return Optional.empty();
        }
    }//fim getby id

    public AlunoDTO create(AlunoDTO alunoDTO){
        Aluno aluno = alunoDTO.toAluno();
        aluno = alunoRepository.save(aluno);
        return alunoDTO.fromAlunoDTO(aluno);
    }//fim update

    public Optional<AlunoDTO> update(Long id, AlunoDTO alunoDTO){
        Optional<Aluno> alunoOptional = alunoRepository.findById(id);
        if(alunoOptional.isPresent()){
            Aluno aluno = alunoOptional.get();
            aluno.setNome(alunoDTO.getNome());
           aluno.setCpf(alunoDTO.getCpf());

            aluno = alunoRepository.save(aluno);

            return Optional.of(alunoDTO.fromAlunoDTO(aluno));
        }else{
            return Optional.empty();
        }
    }//fim do update

    public boolean delete(Long id){
        if(alunoRepository.existsById(id)){
            alunoRepository.deleteById(id);
            return true;
        }else {
            return false;
        }
    }//fim delete
}
