import { Permiso } from "../permisos/permiso.model";
import { BaseModel } from "./../base.model";

export class Rol extends BaseModel {
    Nombre: string;
    Descripcion: string;
    Permisos: Permiso[];
    IsAllPermisosChecked: boolean;

    constructor() {
        super();
        this.Nombre = null;
        this.Descripcion = "";
        this.Permisos = [];
        this.IsAllPermisosChecked = false;
    }
}
