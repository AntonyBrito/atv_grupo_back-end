package com.example.atv_grupo.Controller;


import com.example.atv_grupo.DTO.TurmaDTORequest;
import com.example.atv_grupo.DTO.TurmaDTOResponse;
import com.example.atv_grupo.Entity.Turma;
import com.example.atv_grupo.Service.TurmaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/turma")
public class TurmaController {

    @Autowired
    private TurmaService turmaService;

    @GetMapping
    public List<Turma> getAll(@RequestParam(required = false) String  nome){
        if(nome != null && !nome.isEmpty()){
            return turmaService.getAllByName(nome);
        }
        return turmaService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TurmaDTOResponse> getById(@PathVariable Long id){
        Optional<TurmaDTOResponse> turmaDTOOptional = turmaService.getById(id);
        if(turmaDTOOptional.isPresent()){
            return ResponseEntity.ok(turmaDTOOptional.get());
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<TurmaDTOResponse> create(@RequestBody TurmaDTORequest turmaDTORequest) {
        TurmaDTOResponse response = turmaService.create(turmaDTORequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TurmaDTOResponse> update(@PathVariable Long id,@RequestBody TurmaDTORequest turmaDTORequest) {
        Optional<TurmaDTOResponse> response = turmaService.update(id, turmaDTORequest);
        return response
                .map(turmaDTOResponse -> ResponseEntity.ok().body(turmaDTOResponse))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        boolean deletado = turmaService.delete(id);

        return deletado
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
