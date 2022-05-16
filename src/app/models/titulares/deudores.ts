import { BaseModel } from '../base.model';
import { Zona } from '../zonas/zona';

export class Deudores extends BaseModel{
    ZonaId: string;
    Zona: Zona;
    TitularId: string;
    sNroDocumento: string;
    sApellido: string;
    sNombre: string;        
    sDomicilio: string;

    constructor() {
        super()
        this.sNroDocumento = "";
        this.sNombre = "";
        this.sApellido = "";        
        this.sDomicilio = "";
        this.ZonaId = "";
        this.Zona = null;
    }
}
