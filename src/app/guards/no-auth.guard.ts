import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { take, map } from 'rxjs/operators';
import { JwtDecode } from '../domain/jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private authService: AuthService) { }
 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // console.log(this.authService.isLoggin);
    return !this.authService.isLoggin as boolean;
    // AuthService.jwtDecode.pipe(take(1), map((jwtDecode: JwtDecode) =>  jwtDecode === null && jwtDecode === undefined));;
  }
}
