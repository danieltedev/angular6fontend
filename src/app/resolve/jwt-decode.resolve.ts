import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { JwtDecode } from "../domain/jwt-decode";
import { AuthService } from "../service/auth.service";
import { take } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class JwtDecodeResolve implements Resolve<JwtDecode> {
    constructor() {} 
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<JwtDecode>|Promise<JwtDecode>|JwtDecode {
            return AuthService.jwtDecode.pipe(take(1));
    }
}