import { BaseModel } from '../../base.model';

export class AuthenticationDto extends BaseModel{
    UsuarioNombre : string;
    Password : string;
    constructor() {
        super()
        this.UsuarioNombre = "";
        this.Password = "";
    }
}