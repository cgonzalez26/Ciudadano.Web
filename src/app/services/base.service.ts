import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BaseModel } from "../models/base.model";

@Injectable()
export class BaseService<T extends BaseModel> {
    public readonly HttpClient: HttpClient;
    private readonly Controller: string;
    public entitiesBehaviorSubject: BehaviorSubject<T[]>;
    public entityBehaviorSubject: BehaviorSubject<T>;

    public entitiesObservable: Observable<T[]>;

    constructor(private _httpClient: HttpClient, controller: string) {
        this.HttpClient = _httpClient;
        this.Controller = controller;
        this.entitiesBehaviorSubject = new BehaviorSubject<T[]>([]);
        this.entityBehaviorSubject = new BehaviorSubject<T>(null);
        this.entitiesObservable = this.entitiesBehaviorSubject.asObservable();
    }
    public getEntities(): Observable<T[]> {
        return this.entitiesBehaviorSubject.asObservable();
    }

    public get entities(): T[] {
        return this.entitiesBehaviorSubject.value;
    }

    public setEntities(entities: T[]): void {
        this.entitiesBehaviorSubject.next(entities);
    }

    public getEntity(): Observable<T> {
        return this.entityBehaviorSubject.asObservable();
    }

    public get entity(): T {
        return this.entityBehaviorSubject.value;
    }

    public setEntity(entity: T): void {
        this.entityBehaviorSubject.next(entity);
    }

    public getAll(callback?: any): Observable<T[]> {
        const url: string = `${this.Controller}/all`;
        return this.HttpClient.get<T[]>(url).pipe(
            map((response) => {
                if (callback) {
                    callback(response);
                }
                return response;
            })
        );
    }

    public getById(id: string, callback?: any): Observable<T> {
        const url: string = `${this.Controller}/id/${id}`;
        return this.HttpClient.get<T>(url).pipe(
            map((response) => {
                if (callback) {
                    callback(response);
                }
                return response;
            })
        );
    }

    public count(): Observable<number> {
        const url: string = `${this.Controller}/count`;
        return this.HttpClient.get<number>(url).pipe(
            map((response) => {
                return response;
            })
        );
    }

    public add(entity: T, callback?: any) {
        const url: string = `${this.Controller}/add`;
        return this.HttpClient.post(url, entity).pipe(
            map((response) => {
                if (callback) {
                    callback(response);
                }
            })
        );
    }

    public edit(id: string, entity: T, callback?: any) {
        const url: string = `${this.Controller}/edit/${id}`;
        return this.HttpClient.put(url, entity).pipe(
            map((response) => {
                if (callback) {
                    callback(response);
                }
            })
        );
    }

    public delete(id: string, callback?: any) {
        const url: string = `${this.Controller}/delete/${id}`;
        return this.HttpClient.delete(url).pipe(
            map((response) => {
                if (callback) {
                    callback(response);
                }
            })
        );
    }

    deleteRow(entity: T,field:string){
        let entities = this.entitiesBehaviorSubject.value;
        const index = entities.findIndex(e => e[field] == entity[field]);
        this.entities.splice(index,1);
        this.setEntities(this.entities);
    }
}
