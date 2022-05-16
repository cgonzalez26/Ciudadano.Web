import { BaseModel } from '../base.model';

export class Vehiculo extends BaseModel{
    sDominio: string;
    sModelo: string;
    sMarca: string;
    iAnio: number;
    nVal_F_V: number;
    sDomicilio: string;
    iPIN: number;

    constructor() {
        super()
        this.sDominio = "";
        this.sModelo = "";
        this.sMarca = "";
        this.iAnio = null;
        this.nVal_F_V = null;
        this.sDomicilio = "";
        this.iPIN = null;
    }
}
