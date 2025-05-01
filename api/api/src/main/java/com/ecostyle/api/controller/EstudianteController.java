package com.ecostyle.api.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecostyle.api.dto.EstudianteDTO;
import com.ecostyle.api.model.Estudiante;
import com.ecostyle.api.repository.EstudianteRepository;

@RestController
@RequestMapping("/estudiantes")
public class EstudianteController {
    
    @Autowired
    private EstudianteRepository repository;

    @PostMapping
    public Estudiante almacenar(@RequestBody Estudiante estudiante) {
        return repository.save(estudiante);
    }

    @GetMapping
    public List<EstudianteDTO> listar() {
        List<Estudiante> estudiantes = repository.findAll();

        return estudiantes.stream().map(estudiante -> 
            new EstudianteDTO(
                estudiante.getRut(),
                estudiante.getCorreo(),
                estudiante.getNombre(),
                estudiante.getApellido()
            )
        ).collect(Collectors.toList());
    }

    @DeleteMapping
    public ResponseEntity<String> eliminar(@PathVariable String rut) {
        if(!repository.existsById(rut)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Estudiante no encontrado...");
        }else{
            repository.deleteById(rut);
            return ResponseEntity.ok("Estudiante eliminado con exito!");
        }
    }

    /*@PostMapping(value = "/cambiarContrasena")
    public ResponseEntity<ResponseData> changePassword(@RequestBody PasswordChange pass) {
        ResponseData response = userService.changePassword(pass);
        if (response.isResponce()) {
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);*/
}
