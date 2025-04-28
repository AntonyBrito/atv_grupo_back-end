package com.example.atv_grupo.Controller;

import com.example.atv_grupo.DTO.AlunoDTO;
import com.example.atv_grupo.Entity.Aluno;
import com.example.atv_grupo.Service.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/aluno")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @GetMapping
    public List<Aluno> getAll(@RequestParam(required = false) String  nome){
        if(nome != null && !nome.isEmpty()){
            return alunoService.getAllByName(nome);
        }
        return alunoService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlunoDTO> getById(@PathVariable Long id){
        Optional<AlunoDTO> alunoDTOOptional = alunoService.getById(id);
        if(alunoDTOOptional.isPresent()){
            return ResponseEntity.ok(alunoDTOOptional.get());
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<AlunoDTO> create(@RequestBody AlunoDTO alunoDTO){
        AlunoDTO alunoDTOsave = alunoService.create(alunoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(alunoDTOsave);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlunoDTO> update(@PathVariable Long id, @RequestBody AlunoDTO AlunoDTO){
        Optional<AlunoDTO> AlunoDTOOptional = alunoService.update(id, AlunoDTO);
        if(AlunoDTOOptional.isPresent()){
            return ResponseEntity.ok(AlunoDTOOptional.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        if(alunoService.delete(id)){
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }
}
