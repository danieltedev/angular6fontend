import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { take, map } from 'rxjs/operators';
import { JwtDecode } from '../domain/jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  
    if (!this.authService.isLoggin) this.router.navigate(['/login']);
    
    return this.authService.isLoggin as boolean;
    // AuthService.jwtDecode.pipe(take(1), map((jwtDecode: JwtDecode) =>  jwtDecode === null || jwtDecode === undefined));
  }
}
