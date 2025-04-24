package com.example.atv_grupo.Service;

import com.example.atv_grupo.DTO.TurmaDTORequest;
import com.example.atv_grupo.DTO.TurmaDTOResponse;
import com.example.atv_grupo.Entity.Turma;
import com.example.atv_grupo.Repository.TurmaRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class TurmaService {
    @Autowired
    private TurmaRepository turmaRepository;

    public List<Turma> getAll() {
        return turmaRepository.findAll();
    }// fim getall

    public List<Turma> getAllByName(String nome){
        return turmaRepository.findAllByNome(nome);
    }//fim getall by nome

    public Optional<TurmaDTOResponse> getById(Long idProfessor){
        Optional<Turma> optionalProfessor = turmaRepository.findById(idProfessor);
        if(optionalProfessor.isPresent()){
            TurmaDTOResponse turmaDTOResponse = new TurmaDTOResponse();
            return Optional.of(turmaDTOResponse.fromTurmaResponse((optionalProfessor.get())));
        }else {
            return Optional.empty();
        }
    }//fim getby id

    public TurmaDTOResponse create(TurmaDTORequest turmaDTORequest) {
        Turma turma = turmaDTORequest.toTurmaRequest();
        turma = turmaRepository.save(turma);
        return TurmaDTOResponse.fromTurmaResponse(turma);
    }//fim create



    public Optional<TurmaDTOResponse> update(Long id, TurmaDTORequest turmaDTORequest) {
        Optional<Turma> turmaOptional = turmaRepository.findById(id);

        if (turmaOptional.isPresent()) {
            Turma turma = turmaOptional.get();

            turma.setSigla(turmaDTORequest.getSigla());
            turma.setNumeroSala(turmaDTORequest.getNumeroSala());
            turma.setNome(turmaDTORequest.getNome());

            turma = turmaRepository.save(turma);

            return Optional.of(TurmaDTOResponse.fromTurmaResponse(turma));
        } else {
            return Optional.empty();
        }
    }//fim do update

    public boolean delete(Long id){
        if(turmaRepository.existsById(id)){
            turmaRepository.deleteById(id);
            return true;
        }else {
            return false;
        }
    }
}
