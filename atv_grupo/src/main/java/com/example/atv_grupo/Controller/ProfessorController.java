package com.example.atv_grupo.Controller;

import com.example.atv_grupo.DTO.ProfessorDTO;
import com.example.atv_grupo.Entity.Professor;
import com.example.atv_grupo.Service.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/professor")
public class ProfessorController {

    @Autowired
    private ProfessorService professorService;

    @GetMapping
    public List<Professor> getAll(@RequestParam(required = false) String  nome){
        if(nome != null && !nome.isEmpty()){
            return professorService.getAllByName(nome);
        }
        return professorService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfessorDTO> getById(@PathVariable Long id){
        Optional<ProfessorDTO> professorDTOOptional = professorService.getById(id);
        if(professorDTOOptional.isPresent()){
            return ResponseEntity.ok(professorDTOOptional.get());
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<ProfessorDTO> create(@RequestBody ProfessorDTO professorDTO){
        ProfessorDTO professorDTOsave = professorService.create(professorDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(professorDTOsave);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfessorDTO> update(@PathVariable Long id, @RequestBody ProfessorDTO ProfessorDTO){
        Optional<ProfessorDTO> ProfessorDTOOptional = professorService.update(id, ProfessorDTO);
        if(ProfessorDTOOptional.isPresent()){
            return ResponseEntity.ok(ProfessorDTOOptional.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        if(professorService.delete(id)){
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }
}
