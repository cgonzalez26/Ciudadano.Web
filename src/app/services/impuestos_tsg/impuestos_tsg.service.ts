import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BaseService } from "../base.service";
//import { QueryDto, Filter } from "app/main/models/query.dto";
import { ImpuestosTsg } from "app/models/impuestos_tsg/impuestos_tsg";
import {environment} from 'environments/environment';

@Injectable()
export class ImpuestosTsgService extends BaseService<ImpuestosTsg> {
    TAG = "ImpuestosTsgService";
    private readonly controller = "ImpuestosTsg";
    private formBehaviorSubject: BehaviorSubject<ImpuestosTsg>;
    public formObservable: Observable<ImpuestosTsg>;

    //private entitiesBehaviorSubject: BehaviorSubject<Establecimiento[]>;
    //public entitiesObservable: Observable<Establecimiento[]>;
    //private entityBehaviorSubject: BehaviorSubject<Establecimiento>;
    //public entityObservable: Observable<Establecimiento>;

    constructor(private http: HttpClient) {
        super(http, "ImpuestosTsg");
        //this.entitiesBehaviorSubject = new BehaviorSubject<Establecimiento[]>(
        //    []
        //);
        //this.entitiesObservable = this.entitiesBehaviorSubject.asObservable();
        //this.entityBehaviorSubject = new BehaviorSubject<Establecimiento>(null);
        //this.entityObservable = this.entityBehaviorSubject.asObservable();
        
        this.formBehaviorSubject = new BehaviorSubject<ImpuestosTsg>(JSON.parse(localStorage.getItem(environment.localStorageEditItem)));
        this.formObservable = this.formBehaviorSubject.asObservable();
    }

    public get form(): ImpuestosTsg {
        return this.formBehaviorSubject.value;
    }

    public setForm(form: ImpuestosTsg): void {
        this.formBehaviorSubject.next(form);
    }

    /*public get entities(): Establecimiento[] {
        return this.entitiesBehaviorSubject.value;
    }

    public setEntities(entities: Establecimiento[]): void {
        this.entitiesBehaviorSubject.next(entities);
    }

    public get entity(): Establecimiento {
        return this.entityBehaviorSubject.value;
    }

    public setEntity(entity: Establecimiento): void {
        this.entityBehaviorSubject.next(entity);
    }*/

    /************************* BEGIN: OVERRIDDEN BASE METHODS **************************/

    /**
     * Overridden base method
     */
    public getAll(): Observable<ImpuestosTsg[]> {
        return super.getAll((response) => {
            this.setEntities(response);
        });
    }

    /**
     * Overridden base method
     */
    public getById(id: string): Observable<ImpuestosTsg> {
        return super.getById(id, (response) => {
            this.setEntity(response);
        });
    }

    /**
     * Overridden base method
     */
    public addForm(form: ImpuestosTsg) {
        // const url = `${this.controller}/add`;
        const url = `${this.controller}/custom/add`;
        return this.HttpClient.post<ImpuestosTsg>(url, form).pipe(map(response => {
            return response;
        }));
    }

    public add(entity: ImpuestosTsg) {
        return super.add(entity, (response) => {
            this.entities.push(entity);
            this.setEntities(this.entities);
        });
    }

    /**
     * Overridden base method
     */
    public editForm(form: ImpuestosTsg) {
        const url = `${this.controller}/edit`;
        return this.HttpClient.put<ImpuestosTsg>(url, form).pipe(map(response => {
            return response;
        }));
    }

    public edit(id: string, entity: ImpuestosTsg) {
        return super.edit(id, entity, (response) => {
            const index = this.entities.findIndex((e) => e.Id == id);
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
        return super.delete(id, (response) => {
            const index = this.entities.findIndex((e) => e.Id == id);
            if (index >= 0) {
                this.entities.splice(index, 1);
                this.setEntities(this.entities);
            }
        });
    }

    addEntity(entity: ImpuestosTsg) {
        this.entities.push(entity);
        this.setEntities(this.entities);
    }
    /************************* END: OVERRIDDEN BASE METHODS **************************/

    public customGetAll(): Observable<ImpuestosTsg[]> {
        const url: string = `${this.controller}/custom/all`;
        return this.HttpClient.get<ImpuestosTsg[]>(url).pipe(
            map((response) => {
                this.setEntities(response);
                return response;
            })
        );
    }

    public getByName(name: string): Observable<ImpuestosTsg[]> {
        const url: string = `${this.controller}/name/${name}`;
        return this.HttpClient.get<ImpuestosTsg[]>(url).pipe(
            map((response) => {
                this.setEntities(response);
                return response;
            })
        );
    }  

    public getByNroDocumento(NroDocumento: string): Observable<ImpuestosTsg[]> {
        const url:string = `${this.controller}/getByNroDocumento/${NroDocumento}`;
        return this.HttpClient.get<ImpuestosTsg[]>(url).pipe(
            map((response) => {
                this.setEntities(response);
                return response;
            })
        );
    } 

    public getCountDeudaByNroDocumento(NroDocumento: string): Observable<number> {
        const url:string = `${this.controller}/getCountDeudaByNroDocumento/${NroDocumento}`;
        return this.HttpClient.get<number>(url).pipe(
            map((response) => {                
                return response;
            })
        );
    } 
    
    /*public countWhere(filter: Filter): Observable<number> {
        const url: string = `${this.controller}/count-where`;
        return this.HttpClient.post<number>(url, filter).pipe(
            map((response) => {
                return response;
            })
        );
    }

    public query(
        queryDto: QueryDto<Establecimiento>
    ): Observable<QueryDto<Establecimiento>> {
        const url: string = `${this.controller}/query`;
        return this.HttpClient.post<QueryDto<Establecimiento>>(
            url,
            queryDto
        ).pipe(
            map((response) => {
                return response;
            })
        );
    }

    public customGetByQuery(
        queryDto: QueryDto<Establecimiento>
    ): Observable<QueryDto<Establecimiento>> {
        const url: string = `${this.controller}/custom/query`;
        return this.HttpClient.post<QueryDto<Establecimiento>>(
            url,
            queryDto
        ).pipe(
            map((response) => {
                return response;
            })
        );
    }*/
    
}
