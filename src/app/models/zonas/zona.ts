import { BaseModel } from "./../base.model";

export class Zona extends BaseModel {
    static TAG = "ZonaModel";
    Nombre: string;
    PadreId: string;
    FullId: string;

    constructor() {
        super();
        this.Nombre = null;
        this.PadreId = null;
        this.FullId = null;
    }    
}
