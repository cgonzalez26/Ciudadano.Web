
import {Injectable} from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../base.service';
import {map} from 'rxjs/operators';
import {environment} from 'environments/environment';
import { Deudores } from 'app/models/Titulares/deudores';
//import {TitularDto} from 'app/main/models/Titular/Dto/TitularDto';

@Injectable({
  providedIn: 'root'
})
export class DeudoresService extends BaseService<Deudores>{
  private readonly controller: string = 'Titulares';

  private formBehaviorSubject: BehaviorSubject<Deudores>;
  public formObservable: Observable<Deudores>;

  constructor(
      http: HttpClient,
      private readonly httpClient: HttpClient
  ) { 
    super(http, 'Forms');
    this.formBehaviorSubject = new BehaviorSubject<Deudores>(JSON.parse(localStorage.getItem(environment.localStorageEditItem)));
    this.formObservable = this.formBehaviorSubject.asObservable();
  }

  public get form(): Deudores {
    return this.formBehaviorSubject.value;
}

public setForm(form: Deudores): void {
    this.formBehaviorSubject.next(form);
}

// Fake Get Row
loadData(): Observable<Deudores[]> {
    return this.httpClient.get<Deudores[]>('https://api.myjson.com/bins/c5v2o').pipe(map((res: Deudores[]) => {
        this.setEntities(res);
        return res;
    }));
}

public addForm(form: Deudores) {   
    const url = 'Titulars/mobile/add';
    return this.HttpClient.post<Deudores>(url, form).pipe(map(response => {
        return response;
    }));
}

public addWeb(form: Deudores) { //TitularDto
    const url = `${this.controller}/web/add`;
    return this.HttpClient.post<Deudores>(url, form).pipe(map(response => {
        return response;
    }));
}

public editForm(form: Deudores) {
    const url = `${this.controller}/edit`;
    return this.HttpClient.put<Deudores>(url, form).pipe(map(response => {
        return response;
    }));
}

public editWeb(form: Deudores) { //TitularDto
    const url = `${this.controller}/web/update`;
    return this.HttpClient.put<Deudores>(url, form).pipe(map(response => {
        return response;
    }));
}

// Add new entity
addEntity(entity: Deudores) {
    this.entities.push(entity);
    this.setEntities(this.entities);
}

public validateForm(formulario: string, prefijo: string, codformulario: string) {
    const url = `${this.controller}/Validate?formulario=${formulario}&prefijo=${prefijo}&codformulario=${codformulario}`;
    return this.HttpClient.get(url).pipe(map(response => {
        return response;
    }));
}

public getAllWeb(): Observable<Deudores[]> {
    const url = `${this.controller}/web/all`;
    return this.HttpClient.get<Deudores[]>(url).pipe(map(response => {
        return response;
    }));
}

/************************* BEGIN: OVERRIDDEN BASE METHODS **************************/

/**
 * Overridden base method
 */
public getAll(): Observable<Deudores[]> {
    return super.getAll((response) => {
        this.setEntities(response);
    });
}

/**
 * Overridden base method
 */
public getById(id: string): Observable<Deudores> {
    return super.getById(id, (response) => {
        this.setEntity(response);
    });
}

public getByNroDocumento(sNroDocumento: string): Observable<Deudores> {
    const url:string = `${this.controller}/getByNroDocumento/${sNroDocumento}`;
    return this.HttpClient.get<Deudores>(url).pipe(
        map((response) => {                
            return response;
        })
    );
}

/**
 * Overridden base method
 */
public add(entity: Deudores) {
    return super.add(entity, () => {
        this.entities.push(entity);
        this.setEntities(this.entities);
    });
}

/**
 * Overridden base method
 */
public edit(id: string, entity: Deudores) {
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
public deudoresByZona(zonaid: string): Observable<Deudores[]>{
    //zonaid='1111';
    const url:string = `${this.controller}/deudoresByZona/${zonaid}`;
    console.log('entro service deudor ',url);
    return this.HttpClient.get<Deudores[]>(url).pipe(
        map((response) => {                
            this.setEntities(response);
            return response;
        })
    );
}

}
