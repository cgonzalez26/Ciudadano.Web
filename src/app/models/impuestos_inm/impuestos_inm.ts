import { BaseModel } from '../base.model';


export class ImpuestosInm extends BaseModel{   
    iAnio: number;
    iPeriodo: number;
    nMonto_Pagar: number;
    sCatastro: string;
    nPago: number;
    nSaldo: number;
    dFecha_Pago: Date;
    tObservaciones: string;

    constructor() {
        super();
        //this.iId_Imp_Aut = null;
        this.iAnio = null;
        this.iPeriodo = null;
        this.nMonto_Pagar = null;
        this.sCatastro = null;
        this.nPago = null;
        this.nSaldo = null;
        this.dFecha_Pago = null;
        this.tObservaciones = null;
    }
}
