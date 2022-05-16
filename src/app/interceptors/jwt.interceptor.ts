import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "environments/environment";
import { AuthenticationService } from "app/services/authentication/authentication.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private _authenticationService: AuthenticationService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const noIntercept =
            request.url.startsWith("http://") ||
            request.url.startsWith("https://") ||
            request.url.startsWith("assets/");
        if (noIntercept) return next.handle(request);
        const currentUser = this._authenticationService.usuario;
        if (currentUser && currentUser.Token) {
            request = request.clone({
                setHeaders: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${currentUser.Token}`,
                },
                url: environment.api.base + request.url,
            });
        } else {
            request = request.clone({
                setHeaders: {
                    "Content-Type": "application/json",
                },
                url: environment.api.base + request.url,
            });
        }
        return next.handle(request);
    }
}
