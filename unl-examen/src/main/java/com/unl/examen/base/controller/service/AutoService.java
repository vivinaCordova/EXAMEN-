package com.unl.examen.base.controller.service;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import com.unl.examen.base.controller.dao.dao_models.DaoAuto;
import com.unl.examen.base.models.Auto;
import com.unl.examen.base.models.MarcaEnum;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import jakarta.validation.constraints.NotEmpty;

@BrowserCallable
@AnonymousAllowed
public class AutoService {
    private DaoAuto db;
    public AutoService(){
        db = new DaoAuto();
    }

    public void create(@NotEmpty String nombre, @NotEmpty String tipo, @NotEmpty String placa, @NotEmpty String color) throws Exception {
        if(nombre.trim().length() > 0 && placa.trim().length() > 0 && color.trim().length() > 0 && tipo.trim().length() > 0){
            db.getObj().setPlaca(placa);
            db.getObj().setColor(color);
            db.getObj().setMarca(MarcaEnum.valueOf(tipo));

                throw new  Exception("No se pudo guardar los datos de la banda");
        }
    }

    public List<Auto> lisAllAuto(){
        return Arrays.asList(db.listAll().toArray());
        
    }

    public List<String> listTipo() {
        List<String> lista = new ArrayList<>();
        for(MarcaEnum r: MarcaEnum.values()) {
            lista.add(r.toString());
        }        
        return lista;
    }

    public List<HashMap> listAuto(){
        List<HashMap> lista = new ArrayList<>();
        if(!db.listAll().isEmpty()) {
            Auto [] arreglo = db.listAll().toArray();           
            for(int i = 0; i < arreglo.length; i++) {
                HashMap<String, String> aux = new HashMap<>();
                aux.put("id", arreglo[i].getId().toString());
                aux.put("placa", arreglo[i].getPlaca().toString());
                aux.put("color", arreglo[i].getColor().toString());
                aux.put("tipo", arreglo[i].getMarca().toString());
                lista.add(aux);
            }
        }
        return lista;
    }
}
    
