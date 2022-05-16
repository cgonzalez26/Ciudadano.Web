import { BaseModel } from "./../base.model";

export class Permiso extends BaseModel {
    Nombre: string;
    Descripcion: string;
    Orden: number;
    Concedido: boolean;

    constructor() {
        super();
        this.Nombre = "";
        this.Descripcion = "";
        this.Orden = 0;
        this.Concedido = false;
    }
}
