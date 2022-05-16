import * as uuid from "uuid";

export class BaseModel {
    Id: string;
    RegisterDate?: Date;
    RegisterBy?: string;
    UpdatedDate?: Date;
    UpdatedBy?: string;
    DeletedDate?: Date;
    DeletedBy?: string;
    IsDeleted?: boolean;

    constructor() {
        this.Id = uuid.v4();
        this.RegisterDate = new Date();
        this.RegisterBy = "Anonymous";
        this.UpdatedDate = new Date();
        this.UpdatedBy = "Anonymous";
        this.DeletedDate = null;
        this.DeletedBy = "";
        this.IsDeleted = false;
    }
}

export enum Modalidad {
    AGREGAR,
    BORRAR,
    EDITAR,
    VER,
}
