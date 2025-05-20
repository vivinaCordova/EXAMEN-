package com.unl.examen.base.controller.dao.dao_models;

import com.unl.examen.base.controller.dao.AdapterDao;
import com.unl.examen.base.models.Auto;

public class DaoAuto extends AdapterDao<Auto>{
    private Auto obj;

    public DaoAuto() {
        super(Auto.class);
        // TODO Auto-generated constructor stub
    }

    public Auto getObj() {
        if (obj == null)
            this.obj = new Auto();
        return this.obj;
    }

    public void setObj(Auto obj) {
        this.obj = obj;
    }

    public Boolean save() {
        try {
            obj.setId(listAll().getLength()+1);
            this.persist(obj);
            return true;
        } catch (Exception e) {
            //TODO
            return false;
            // TODO: handle exception
        }
    }

    public Boolean update(Integer pos) {
        try {
            this.update(obj, pos);
            return true;
        } catch (Exception e) {
            //TODO
            return false;
            // TODO: handle exception
        }
    }

    public static void main(String[] args) {
        DaoAuto da = new DaoAuto();
        if (da.save())
            System.out.println("GUARDADO");
        else
            System.out.println("Hubo un error");
    
        }

    
}
