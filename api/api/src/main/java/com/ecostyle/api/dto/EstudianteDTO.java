package com.ecostyle.api.dto;

public class EstudianteDTO {
    private String rut;
    private String correo;
    private String nombre;
    private String apellido;

    public EstudianteDTO() {}

    public EstudianteDTO(String rut, String correo, String nombre, String apellido) {
        this.rut = rut;
        this.correo = correo;
        this.nombre = nombre;
        this.apellido = apellido;
    }


    /**
     * @return String return the rut
     */
    public String getRut() {
        return rut;
    }

    /**
     * @param rut the rut to set
     */
    public void setRut(String rut) {
        this.rut = rut;
    }

    /**
     * @return String return the correo
     */
    public String getCorreo() {
        return correo;
    }

    /**
     * @param correo the correo to set
     */
    public void setCorreo(String correo) {
        this.correo = correo;
    }

    /**
     * @return String return the nombre
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * @param nombre the nombre to set
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * @return String return the apellido
     */
    public String getApellido() {
        return apellido;
    }

    /**
     * @param apellido the apellido to set
     */
    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

}
