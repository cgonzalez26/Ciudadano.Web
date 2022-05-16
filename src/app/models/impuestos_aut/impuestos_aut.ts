import { BaseModel } from '../base.model';


export class ImpuestosAut extends BaseModel{
    //iId_Imp_Aut: number;
    iAnio: number;
    iPeriodo: number;
    nMonto_Pagar: number;
    sDominio: string;
    nPago: number;
    nSaldo: number;
    dFecha_Pago: Date;
    tObservaciones: string;
    VehiculoId: string;

    constructor() {
        super();
        //this.iId_Imp_Aut = null;
        this.iAnio = null;
        this.iPeriodo = null;
        this.nMonto_Pagar = null;
        this.sDominio = null;
        this.nPago = null;
        this.nSaldo = null;
        this.dFecha_Pago = null;
        this.tObservaciones = null;
        this.VehiculoId = null;
    }
}
