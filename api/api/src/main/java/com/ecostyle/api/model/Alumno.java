package com.ecostyle.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

public class Alumno {
    @Id
    @Column(name = "rut_alumno")
    private String rut;

    @Column(name = "nivel_academico")
    private String nivelAcademico;

    // definiendo la relacion entre entidades
    @OneToOne
    // el nombre de la columna en la tabla referenciada que actua como clave
    // primaria(en este caso en la tabla usuario)
    @JoinColumn(name = "rut_alumno", referencedColumnName = "rut_usuario", insertable = false, updatable = false)
    private Usuario usuario;

    public Alumno() {
        this.nivelAcademico = "";
        this.rut = "";
        this.usuario = new Usuario();
    }

    public Alumno(String nivelAcademico, String rut, Usuario usuario) {
        this.nivelAcademico = nivelAcademico;
        this.rut = rut;
        this.usuario = usuario;
    }

    public String getRut() {
        return rut;
    }

    public void setRut(String rut) {
        this.rut = rut;
    }

    public String getNivelAcademico() {
        return nivelAcademico;
    }

    public void setNivelAcademico(String nivelAcademico) {
        this.nivelAcademico = nivelAcademico;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

}