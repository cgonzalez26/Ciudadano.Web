import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BaseService } from "../base.service";
import { Zona } from "app/models/zonas/zona";

@Injectable()
export class ZonaService extends BaseService<Zona> {
    TAG = "ZonaService";
    private readonly controller = "Zonas";
    /*private entitiesBehaviorSubject: BehaviorSubject<Zona[]>;
    public entitiesObservable: Observable<Zona[]>;
    private entityBehaviorSubject: BehaviorSubject<Zona>;
    public entityObservable: Observable<Zona>;*/

    constructor(private http: HttpClient) {
        super(http, "Zonas");
        /*this.entitiesBehaviorSubject = new BehaviorSubject<Zona[]>([]);
        this.entitiesObservable = this.entitiesBehaviorSubject.asObservable();
        this.entityBehaviorSubject = new BehaviorSubject<Zona>(null);
        this.entityObservable = this.entityBehaviorSubject.asObservable();*/
    }

    public get entities(): Zona[] {
        return this.entitiesBehaviorSubject.value;
    }

    public setEntities(entities: Zona[]): void {
        this.entitiesBehaviorSubject.next(entities);
    }

    public get entity(): Zona {
        return this.entityBehaviorSubject.value;
    }

    public setEntity(entity: Zona): void {
        this.entityBehaviorSubject.next(entity);
    }

    public zonaByDepartamento(departamentoId: string): Observable<Zona[]> {
        const url: string = `${this.controller}/zonaByDepartamento/${departamentoId}`;
        return this.HttpClient.get<Zona[]>(url).pipe(
            map((response) => {
                this.setEntities(response);
                return response;
            })
        );
    }
    /************************* BEGIN: OVERRIDDEN BASE METHODS **************************/

    /**
     * Overridden base method
     */
    public getAll(): Observable<Zona[]> {
        return super.getAll((response) => {
            this.setEntities(response);
        });
    }

    /**
     * Overridden base method
     */
    public getById(id: string): Observable<Zona> {
        return super.getById(id, (response) => {
            this.setEntity(response);
        });
    }

    /**
     * Overridden base method
     */
    public add(entity: Zona) {
        return super.add(entity, (response) => {
            this.entities.push(entity);
            this.setEntities(this.entities);
        });
    }

    /**
     * Overridden base method
     */
    public edit(id: string, entity: Zona) {
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

    /************************* END: OVERRIDDEN BASE METHODS **************************/
}
