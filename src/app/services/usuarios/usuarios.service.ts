import {Usuario} from './../../models/usuarios/usuario.model';
import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../base.service';
import {map} from 'rxjs/operators';
import {environment} from 'environments/environment';
import { stringify } from 'querystring';
//import {UsuarioDto} from 'app/main/models/usuario/Dto/usuarioDto';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService extends BaseService<Usuario>{
  private readonly controller: string = 'Usuarios';

  private formBehaviorSubject: BehaviorSubject<Usuario>;
  public formObservable: Observable<Usuario>;

  constructor(
      http: HttpClient,
      private readonly httpClient: HttpClient
  ) { 
    super(http, 'Usuarios');
    this.formBehaviorSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem(environment.localStorageEditItem)));
    this.formObservable = this.formBehaviorSubject.asObservable();
  }

  public get form(): Usuario {
    return this.formBehaviorSubject.value;
}

public setForm(form: Usuario): void {
    this.formBehaviorSubject.next(form);
}

// Fake Get Row
loadData(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>('https://api.myjson.com/bins/c5v2o').pipe(map((res: Usuario[]) => {
        this.setEntities(res);
        return res;
    }));
}

public getByUser() {
    const url = `${this.controller}/mobile/system-users`;
    return this.HttpClient.get<Usuario[]>(url).pipe(map(response => {
        /* if(response && response.length > 0){
            response.forEach((f:any,i) => {
                //f.CodUsuario = JSON.parse(f.CodUsuario);
                //f.UserCode = JSON.parse(f.UserCode);
                if (i == response.length - 1){
                    this.setEntities(response);
                }
            })
        } else{
            this.setEntities(response);
        } */
        this.setEntities(response);
    }));
}

public getByVersion(codVersion: string) {
    const url = `${this.controller}/ByVersion?codVersion=${codVersion}`;
    return this.HttpClient.get<Usuario[]>(url).pipe(map(response => {       
        return response;
    }));
}

public getUsersByForm(codformulario: string) {
    const url = `${this.controller}/GetUsersByForm?codformulario=${codformulario}`;
    return this.HttpClient.get(url).pipe(map(response => {
        return response;
    }));
}

public addForm(form: Usuario) {   
    //const url = 'Usuarios/mobile/add';
    const url = `${this.controller}/add2`;
    console.log('addform ',form);
    return this.HttpClient.post<Usuario>(url, form).pipe(map(response => {
        return response;
    }));
}

public addWeb(form: Usuario) { //UsuarioDto
    const url = `${this.controller}/web/add`;
    return this.HttpClient.post<Usuario>(url, form).pipe(map(response => {
        return response;
    }));
}

public editForm(form: Usuario) {
    const url = `${this.controller}/edit`;
    return this.HttpClient.put<Usuario>(url, form).pipe(map(response => {
        return response;
    }));
}

public editWeb(form: Usuario) { //UsuarioDto
    const url = `${this.controller}/web/update`;
    let id: string;
    id= this.form.Id;
    console.log('editweb ',form);
    return this.HttpClient.post<Usuario>(url, form).pipe(map(response => {
        //return response;
        const index = this.entities.findIndex((e) => e.Id == id);
        if (index >= 0) {
            this.entities[index] = form;
            this.setEntities(this.entities);
        }

    }));
}

// Add new entity
addEntity(entity: Usuario) {
    this.entities.push(entity);
    this.setEntities(this.entities);
}

public validateForm(formulario: string, prefijo: string, codformulario: string) {
    const url = `${this.controller}/Validate?formulario=${formulario}&prefijo=${prefijo}&codformulario=${codformulario}`;
    return this.HttpClient.get(url).pipe(map(response => {
        return response;
    }));
}

public addUserForm(data: any) {
    const url = `${this.controller}/AddUserForm`;
    return this.HttpClient.post<any>(url, data).pipe(map(response => {
        return response;
    }));
}

public getAllWeb(): Observable<Usuario[]> {
    const url = `${this.controller}/web/all`;
    return this.HttpClient.get<Usuario[]>(url).pipe(map(response => {
        return response;
    }));
}

/************************* BEGIN: OVERRIDDEN BASE METHODS **************************/

/**
 * Overridden base method
 */
public getAll(): Observable<Usuario[]> {
    return super.getAll((response) => {
        this.setEntities(response);
    });
}

/**
 * Overridden base method
 */
public getById(id: string): Observable<Usuario> {
    return super.getById(id, (response) => {
        this.setEntity(response);
    });
}

/**
 * Overridden base method
 */
public add(entity: Usuario) {
    return super.add(entity, () => {
        this.entities.push(entity);
        this.setEntities(this.entities);
    });
}

/**
 * Overridden base method
 */
public edit(id: string, entity: Usuario) {
    return super.edit(id, entity, () => {
        const index = this.entities.findIndex(e => e.Id == id);
        if (index >= 0) {
            this.entities[index] = entity;
            this.setEntities(this.entities);
        }
    });
}

/**
 * Overridden base method
 */
public delete(id: string) {
    return super.delete(id, () => {
        const index = this.entities.findIndex(e => e.Id == id);
        if (index >= 0) {
            this.entities.splice(index, 1);
            this.setEntities(this.entities);
        }
    });
}

/************************* END: OVERRIDDEN BASE METHODS **************************/

public getGender() {
    // const controlador ='Genders';
    const url = `Genders/mobile/all`;
    return this.HttpClient.get<any[]>(url).pipe(map(response => {
        /* if(response && response.length > 0){
            response.forEach((f:any,i) => {
                f.UsersForm = JSON.parse(f.UsersForm);
                if (i == response.length - 1){
                    this.setEntities(response);
                }
            });
        } else{
            this.setEntities(response);
        } */
        return response;
    }));
}

public getSport() {
    const url = `Sports/getAll`;
    return this.HttpClient.get<any[]>(url).pipe(map(response => {
        return response;
    }));
}

public getSportWeb() {
    const url = `Sports/web/all`;
    return this.HttpClient.get<any[]>(url).pipe(map(response => {
        return response;
    }));
}

public getCategory() {
    const url = `Sports/getAll`;
    return this.HttpClient.get<any[]>(url).pipe(map(response => {
        return response;
    }));
}

public getUsersUsuarioByUserCode(userCode: string) {
    const url = `Usuarios/web/system-users?UserCode=${userCode}`;
    return this.HttpClient.get(url).pipe(map(response => {
        return response;
    }));
}

public getUsersUsuarioByZoneId(zoneId: string) {
    const url = `Usuarios/web/Usuariobyzone?ZoneId=${zoneId}`;
    return this.HttpClient.get(url).pipe(map(response => {
        return response;
    }));
}
}
