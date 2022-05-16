import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rol } from 'app/models/roles/rol.model';

@Injectable()
export class RolesService extends BaseService<Rol> {

    private readonly controller = 'Roles';

    constructor(
        http: HttpClient,
    ) {
        super(http, 'Roles');
    }

    getAll(): Observable<Rol[]> {
        const url: string = `${this.controller}/all`;
        console.log('url ',url);
        return this.HttpClient.get<Rol[]>(url).pipe(map(response => {
            return response;
        }));
    }

    public addEditPermission(entity: Rol): Observable<any> {
        const url: string = `${this.controller}/addEditPermission`;
        return this.HttpClient.post<any>(url, entity).pipe(
            map((response) => {
                return response;
            })
        );
    }
}
