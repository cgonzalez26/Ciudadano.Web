import { BaseModel } from '../base.model';


export class Impuestos extends BaseModel{
    iAnio: number;
    iPeriodo: number;
    TipoImpuesto: string;    
    Propiedad: string;
    nSaldo: number;
    constructor() {
        super();
        this.iAnio = null;
        this.iPeriodo = null;
        this.TipoImpuesto = "";
        this.Propiedad = "";
        this.nSaldo = null;    
    }
}        