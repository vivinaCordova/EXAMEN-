package com.unl.examen.base.models;

public class Auto {
    private Integer id;
    private String placa;
    private String color;
    private MarcaEnum marca;

    public MarcaEnum getMarca() {
        return this.marca;
    }

    public void setMarca(MarcaEnum marca) {
        this.marca = marca;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public String getPlaca() {
        return this.placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getColor() {
        return this.color;
    }

    public void setColor(String color) {
        this.color = color;
    }

}
