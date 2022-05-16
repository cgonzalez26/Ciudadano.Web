import { Rol } from "../roles/rol.model";
import { BaseModel } from '../base.model';
import { TipoEstablecimiento } from "../tipo-establecimientos/tipo-establecimiento";
import { Zona } from "../zonas/zona";

export class Establecimiento extends BaseModel{
    Codigo: string;
    Nombre: string;
    Domicilio: string;
    TipoEstablecimientoId: string;
    TipoEstablecimiento: TipoEstablecimiento;
    ZonaId: string;
    Zona: Zona;
    //Latitud: string; 
    //Longitud: string; 

    constructor() {
        super();
        this.Codigo = null;
        this.Nombre = null;
        this.Domicilio = null;
        this.TipoEstablecimientoId = null;
        this.TipoEstablecimiento = null;
        this.ZonaId = null;
        this.Zona = null;
    }
}
