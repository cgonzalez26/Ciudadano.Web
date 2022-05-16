import { BaseModel } from '../base.model';

export class Titular extends BaseModel{
    sNombre: string;
    sApellido: string;
    sMail: string;
    sTelefono: string;
    sNroDocumento: string;
    sDomicilio: string;
    sCelular: string;
    ZonaId: string;

    constructor() {
        super()
        this.sNombre = "";
        this.sApellido = "";
        this.sMail = "";
        this.sTelefono = "";
        this.sNroDocumento = "";
        this.sDomicilio = "";
        this.sCelular = "";
        this.ZonaId = "";
    }
}
