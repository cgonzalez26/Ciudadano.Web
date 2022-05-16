import { BaseModel } from "./../base.model";

export class TipoEstablecimiento extends BaseModel {
    Nombre: string;
    Descripcion: string;

    constructor() {
        super();
        this.Nombre = "";
        this.Descripcion = "";
    }
}
