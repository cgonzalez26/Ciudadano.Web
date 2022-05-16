import {Titular} from './../../models/titulares/titular';
import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../base.service';
import {map} from 'rxjs/operators';
import {environment} from 'environments/environment';
import { Deudores } from 'app/models/titulares/deudores';
import { Impuestos } from 'app/models/impuestos/impuestos';
//import {TitularDto} from 'app/main/models/Titular/Dto/TitularDto';

@Injectable({
  providedIn: 'root'
})
export class TitularesService extends BaseService<Titular>{
  private readonly controller: string = 'Titulares';

  private formBehaviorSubject: BehaviorSubject<Titular>;
  public formObservable: Observable<Titular>;

  constructor(
      http: HttpClient,
      private readonly httpClient: HttpClient
  ) { 
    super(http, 'Forms');
    this.formBehaviorSubject = new BehaviorSubject<Titular>(JSON.parse(localStorage.getItem(environment.localStorageEditItem)));
    this.formObservable = this.formBehaviorSubject.asObservable();
  }

  public get form(): Titular {
    return this.formBehaviorSubject.value;
}

public setForm(form: Titular): void {
    this.formBehaviorSubject.next(form);
}

// Fake Get Row
loadData(): Observable<Titular[]> {
    return this.httpClient.get<Titular[]>('https://api.myjson.com/bins/c5v2o').pipe(map((res: Titular[]) => {
        this.setEntities(res);
        return res;
    }));
}

public addForm(form: Titular) {   
    const url = 'Titulars/mobile/add';
    return this.HttpClient.post<Titular>(url, form).pipe(map(response => {
        return response;
    }));
}

public addWeb(form: Titular) { //TitularDto
    const url = `${this.controller}/web/add`;
    return this.HttpClient.post<Titular>(url, form).pipe(map(response => {
        return response;
    }));
}

public editForm(form: Titular) {
    const url = `${this.controller}/edit`;
    return this.HttpClient.put<Titular>(url, form).pipe(map(response => {
        return response;
    }));
}

public editWeb(form: Titular) { //TitularDto
    const url = `${this.controller}/web/update`;
    return this.HttpClient.put<Titular>(url, form).pipe(map(response => {
        return response;
    }));
}

// Add new entity
addEntity(entity: Titular) {
    this.entities.push(entity);
    this.setEntities(this.entities);
}

public validateForm(formulario: string, prefijo: string, codformulario: string) {
    const url = `${this.controller}/Validate?formulario=${formulario}&prefijo=${prefijo}&codformulario=${codformulario}`;
    return this.HttpClient.get(url).pipe(map(response => {
        return response;
    }));
}

public getAllWeb(): Observable<Titular[]> {
    const url = `${this.controller}/web/all`;
    return this.HttpClient.get<Titular[]>(url).pipe(map(response => {
        return response;
    }));
}

/************************* BEGIN: OVERRIDDEN BASE METHODS **************************/

/**
 * Overridden base method
 */
public getAll(): Observable<Titular[]> {
    return super.getAll((response) => {
        this.setEntities(response);
    });
}

/**
 * Overridden base method
 */
public getById(id: string): Observable<Titular> {
    return super.getById(id, (response) => {
        this.setEntity(response);
    });
}

public getByNroDocumento(sNroDocumento: string): Observable<Titular> {
    const url:string = `${this.controller}/getByNroDocumento/${sNroDocumento}`;
    return this.HttpClient.get<Titular>(url).pipe(
        map((response) => {                
            return response;
        })
    );
}

/**
 * Overridden base method
 */
public add(entity: Titular) {
    return super.add(entity, () => {
        this.entities.push(entity);
        this.setEntities(this.entities);
    });
}

/**
 * Overridden base method
 */
public edit(id: string, entity: Titular) {
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

/*public getUsersTitularByUserCode(userCode: string) {
    const url = `Titulars/web/system-users?UserCode=${userCode}`;
    return this.HttpClient.get(url).pipe(map(response => {
        return response;
    }));
}*/
public deudoresByZona(zonaid: string): Observable<Titular[]>{
    //zonaid='1111';
    const url:string = `${this.controller}/deudoresByZona/${zonaid}`;
    console.log('entro service deudor ',url);
    return this.HttpClient.get<Titular[]>(url).pipe(
        map((response) => {                
            this.setEntities(response);
            return response;
        })
    );
}

public getDeudasByTitularId(titularid: string): Observable<Impuestos[]>{
    const url:string = `${this.controller}/getDeudasByTitularId/${titularid}`;
    console.log('url get deudas ',url);
    return this.HttpClient.get<Impuestos[]>(url).pipe(
        map((response) => {                
            //this.setEntities(response);
            return response;
        })
    );
}

}
