import { Injectable } from "@angular/core";
import { Observable, Subscriber, BehaviorSubject } from "rxjs";
import { NgxPermissionsService } from "ngx-permissions";
import jwt_decode from "jwt-decode";
import { environment } from "environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Usuario } from "app/models/usuarios/usuario.model";
import { Rol } from "app/models/roles/rol.model";
import { Permiso } from "app/models/permisos/permiso.model";
import { AuthenticationDto } from "app/models/usuarios/dto/AuthenticationDto";

@Injectable()
export class AuthenticationService {
    TAG = "AuthenticationService";
    private usuarioBehaviorSubject: BehaviorSubject<Usuario>;
    public usuarioObservable: Observable<Usuario>;

    constructor(
        private http: HttpClient,
        private ngxPermissionsService: NgxPermissionsService
    ) {
        this.usuarioBehaviorSubject = new BehaviorSubject<Usuario>(
            JSON.parse(
                localStorage.getItem(environment.localStorageAuthDataItem)
            )
        );
        this.usuarioObservable = this.usuarioBehaviorSubject.asObservable();
    }

    public get usuario(): Usuario {
        return this.usuarioBehaviorSubject.value;
    }

    public setUsuario(usuario: Usuario): void {
        this.usuarioBehaviorSubject.next(usuario);
    }

    public login(username: string, password: string): Observable<boolean> {
        //const body: { UsuarioNombre: string; Password: string; toString: () => any; } = {};
        const body = new AuthenticationDto();
        //body.append("grant_type", "password");
        body.UsuarioNombre =  username;
        body.Password = password;
        // body.append("scope", environment.scope);
        //body.append("CodSistema", environment.appCode);
        const options = {
            headers: new HttpHeaders({
                //"Content-Type": "application/json-patch+json",
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
                //Authorization: "Basic Y29wYWxlY2hlLmNsaWVudDpDb3BhTGVjaGVDbGllbnQtOGJhYTQ2MWMtNGJjMy00N2JlLTg3MzItMmU5N2NkMDA4NDc0",
            }),
        };
        console.log(
            `entro login2`, options
        );

        return this.http
            .post(
                environment.api.auth + "api/Usuarios/authenticate",
                body,
                options
            )
            .pipe(
                map((response: any) => {
                    console.log(`${this.TAG} > login > response`, response);
                    if (!response || !response.Token) {
                        return false;
                    }
                    const userToken = jwt_decode(response.Token);
                    console.log(
                        `${this.TAG} > login > r > decode token`,
                        userToken
                    );
                    /*const sub = JSON.parse(decodedToken["sub"]);
                    console.log(
                        `${this.TAG} > login > r > decode token > sub`,
                        sub
                    );
                    if (!sub) {
                        return false;
                    }*/
                    /*const role2 = sub.Roles.find(
                        (r2) => r2.CodSistema == environment.appCode
                    );
                    if (!role2) {
                        return false;
                    }
                    */                    
                    const rol = new Rol();
                    rol.Id = response["RolId"];
                    rol.Nombre = (response["RolId"] == 'COD_ADMIN')?'Super Admin':'Contribuyente';

                    const user = new Usuario();
                    user.Nombres = response["Nombres"];
                    user.Apellidos = response["Apellidos"];
                    user.Email = response["Email"];
                    user.Foto = response["Foto"];                    
                    user.Rol = rol;
                    user.Telefono = response["Telefono"];
                    user.sNroDocumento = response["sNroDocumento"];

                    user.Rol.Id = rol.Id;
                    user.Rol.Nombre = rol.Nombre;
                    /*user.CodUsuario = sub.CodUsuario;
                    user.FechaActualizacion = sub.FechaActualizacion
                        ? new Date(sub.FechaActualizacion)
                        : null;
                    user.Nombre = sub.Nombre;
                    user.Apellido = sub.Apellido;
                    user.Mail = sub.Mail;
                    user.Foto = sub.Foto;
                    user.Lenguaje = sub.Lenguaje ? sub.Lenguaje : "es";
                    user.Rol = rol;
                    user.Telefono1 = sub.Telefono1;*/
                    user.Token = response["Token"];

                    localStorage.setItem(
                        environment.localStorageAuthDataItem,
                        JSON.stringify(user)
                    );

                    this.setUsuario(user);
                    console.log(
                        `${this.TAG} > login > this.user`,
                        this.usuario
                    );

                    return true;
                })
            );
    }

    public getPermisos(): Observable<string[]> {
        let authData = this.getAuthData();
        if (
            authData &&
            authData.Rol &&
            authData.Rol.Permisos &&
            authData.Rol.Permisos.length > 0
        ) {
            let permisos: string[] = [];
            for (const permiso of authData.Rol.Permisos) {
                if (!permisos.find((p) => p == permiso.Id)) {
                    permisos.push(permiso.Id);
                }
            }
            return Observable.create((observer: Subscriber<string[]>) => {
                observer.next(permisos);
                observer.complete();
            });
        }
        console.log(`getPermisos `,authData);
        const token = this.getToken();
        const rol = this.getRol();
        const rolId = rol ? rol.Id : null;
        if (!token || !rolId) {
            return Observable.create((observer: Subscriber<string[]>) => {
                observer.next([]);
                observer.complete();
            });
        }
        console.log(`getPermisos > token`,token);
        // TODO Implementar el método /api/permissions/{roleId} en tu API, para obtener los permisos
        const options = {
            headers: new HttpHeaders({
                Authorization: "Bearer " + token,
            }),
        };
        return this.http
            .get<Permiso[]>(
                environment.api.base + "Permisos/GetByRolId/" + rolId,
                options
            )
            .pipe(
                map(
                    (response) => {
                        console.log(
                            `${this.TAG} > getPermisos > response >entro`,
                            response
                        );
                        const permisos: Permiso[] = (<Permiso[]>(
                            response
                        )).filter((p) => p.Concedido);
                        authData.Rol.Permisos = permisos;
                        this.setAuthData(authData);
                        const result: string[] = [];
                        for (const permiso of permisos) {
                            if (!result.find((p) => p == permiso.Id)) {
                                result.push(permiso.Id);
                            }
                            result.push(permiso.Id);
                        }
                        return result;
                    },
                    (error) => {
                        console.error(
                            `${this.TAG} > getPermisos > error`,
                            error
                        );
                        return [];
                    }
                )
            );
    }

    public getAuthData(): any {
        return JSON.parse(
            localStorage.getItem(environment.localStorageAuthDataItem)
        );
    }

    public setAuthData(authData: any) {
        localStorage.setItem(
            environment.localStorageAuthDataItem,
            JSON.stringify(authData)
        );
    }

    public getToken(): string {
        let authData = this.getAuthData();
        if (authData && authData.Token) {
            return authData.Token;
        }
        return null;
    }

    public getLenguaje(): string {
        let authData = this.getAuthData();
        if (authData) {
            return authData.Lenguaje;
        }
        return null;
    }

    public getCodUsuario(): string {
        let authData = this.getAuthData();
        if (authData) {
            return authData.CodUsuario;
        }
        return null;
    }

    public getRol(): Rol {
        let authData = this.getAuthData();
        if (authData && authData.Rol) {
            return authData.Rol;
        }
        return null;
    }

    public logout(): void {
        this.ngxPermissionsService.flushPermissions();
        localStorage.removeItem(environment.localStorageAuthDataItem);
        this.usuarioBehaviorSubject.next(null);
    }
}
