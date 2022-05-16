import { Rol } from "../roles/rol.model";
import { BaseModel } from '../base.model';

export class Usuario extends BaseModel{
    UsuarioNombre: string;
    Password: string;    
    Nombres: string;
    Apellidos: string;
    FechaNacimiento: Date;
    Email: string;
    Foto: string;
    RolId: string;
    Rol: Rol;
    CodigoPostal: string;
    Telefono: string;
    sNroDocumento: string;
    Token: string;

    constructor() {
        super()
        this.UsuarioNombre = "";
        this.Password = "";        
        this.Nombres = "";
        this.Apellidos = "";
        this.FechaNacimiento = null;
        this.Email = "";
        this.Foto = "";
        this.RolId = "";
        this.Rol = null;
        this.CodigoPostal = "";
        this.Telefono = "";
        this.sNroDocumento = "";
        this.Token = "";
    }
}
