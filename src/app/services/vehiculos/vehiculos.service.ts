import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BaseService } from "../base.service";
//import { QueryDto, Filter } from "app/main/models/query.dto";
import { Vehiculo } from "app/models/vehiculos/vehiculo";
import {environment} from 'environments/environment';

@Injectable()
export class VehiculosService extends BaseService<Vehiculo> {
    TAG = "Vehiculoservice";
    private readonly controller = "Vehiculos";
    private formBehaviorSubject: BehaviorSubject<Vehiculo>;
    public formObservable: Observable<Vehiculo>;

    //private entitiesBehaviorSubject: BehaviorSubject<Vehiculo[]>;
    //public entitiesObservable: Observable<Vehiculo[]>;
    //private entityBehaviorSubject: BehaviorSubject<Vehiculo>;
    //public entityObservable: Observable<Vehiculo>;

    constructor(private http: HttpClient) {
        super(http, "Vehiculos");
        //this.entitiesBehaviorSubject = new BehaviorSubject<Vehiculo[]>(
        //    []
        //);
        //this.entitiesObservable = this.entitiesBehaviorSubject.asObservable();
        //this.entityBehaviorSubject = new BehaviorSubject<Vehiculo>(null);
        //this.entityObservable = this.entityBehaviorSubject.asObservable();
        
        this.formBehaviorSubject = new BehaviorSubject<Vehiculo>(JSON.parse(localStorage.getItem(environment.localStorageEditItem)));
        this.formObservable = this.formBehaviorSubject.asObservable();
    }

    public get form(): Vehiculo {
        return this.formBehaviorSubject.value;
    }

    public setForm(form: Vehiculo): void {
        this.formBehaviorSubject.next(form);
    }

    /*public get entities(): Vehiculo[] {
        return this.entitiesBehaviorSubject.value;
    }

    public setEntities(entities: Vehiculo[]): void {
        this.entitiesBehaviorSubject.next(entities);
    }

    public get entity(): Vehiculo {
        return this.entityBehaviorSubject.value;
    }

    public setEntity(entity: Vehiculo): void {
        this.entityBehaviorSubject.next(entity);
    }*/

    /************************* BEGIN: OVERRIDDEN BASE METHODS **************************/

    /**
     * Overridden base method
     */
    public getAll(): Observable<Vehiculo[]> {
        return super.getAll((response) => {
            this.setEntities(response);
        });
    }

    /**
     * Overridden base method
     */
    public getById(id: string): Observable<Vehiculo> {
        return super.getById(id, (response) => {
            this.setEntity(response);
        });
    }

    /**
     * Overridden base method
     */
    public addForm(form: Vehiculo) {
        // const url = `${this.controller}/add`;
        const url = `${this.controller}/custom/add`;
        return this.HttpClient.post<Vehiculo>(url, form).pipe(map(response => {
            return response;
        }));
    }

    public add(entity: Vehiculo) {
        return super.add(entity, (response) => {
            this.entities.push(entity);
            this.setEntities(this.entities);
        });
    }

    /**
     * Overridden base method
     */
    public editForm(form: Vehiculo) {
        const url = `${this.controller}/edit`;
        return this.HttpClient.put<Vehiculo>(url, form).pipe(map(response => {
            return response;
        }));
    }

    public edit(id: string, entity: Vehiculo) {
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

    addEntity(entity: Vehiculo) {
        this.entities.push(entity);
        this.setEntities(this.entities);
    }
    /************************* END: OVERRIDDEN BASE METHODS **************************/

    public customGetAll(): Observable<Vehiculo[]> {
        const url: string = `${this.controller}/custom/all`;
        return this.HttpClient.get<Vehiculo[]>(url).pipe(
            map((response) => {
                this.setEntities(response);
                return response;
            })
        );
    }

    public getByName(name: string): Observable<Vehiculo[]> {
        const url: string = `${this.controller}/name/${name}`;
        return this.HttpClient.get<Vehiculo[]>(url).pipe(
            map((response) => {
                this.setEntities(response);
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
        queryDto: QueryDto<Vehiculo>
    ): Observable<QueryDto<Vehiculo>> {
        const url: string = `${this.controller}/query`;
        return this.HttpClient.post<QueryDto<Vehiculo>>(
            url,
            queryDto
        ).pipe(
            map((response) => {
                return response;
            })
        );
    }

    public customGetByQuery(
        queryDto: QueryDto<Vehiculo>
    ): Observable<QueryDto<Vehiculo>> {
        const url: string = `${this.controller}/custom/query`;
        return this.HttpClient.post<QueryDto<Vehiculo>>(
            url,
            queryDto
        ).pipe(
            map((response) => {
                return response;
            })
        );
    }*/
    
}
