import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Usuario } from '../domain/usuario';
import { environment } from '../../environments/environment';
import { Token } from '../domain/token';
import { JwtDecode } from '../domain/jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static jwtDecode: BehaviorSubject<JwtDecode> = new BehaviorSubject<JwtDecode>(null);
  isLoggin: Boolean = false;
  accessToken: String;
  username: String;

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario: Usuario): Observable<Token> {
    const body = new HttpParams()
      .append('grant_type', 'password')
      .append('username', usuario.email)
      .append('password', usuario.senha);

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa('angular:@ngul@r'));
    
    const options = {headers: headers, reportProgress: true};

    return this.http.post<Token>(environment.API_AUTH, body, options).pipe(
      tap((token: Token) => this.storageTokenAndUser(token)),
      catchError(e => throwError(e))
    );
  }

  static parseJwt(token: String): JwtDecode {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jwtDecode: JwtDecode = JSON.parse(window.atob(base64));
    jwtDecode.access_token = token;
    return jwtDecode;
  }

  private storageTokenAndUser(token: Token): void {
    this.isLoggin = true;
    this.accessToken = token.access_token;
    this.username = token.name
    AuthService.jwtDecode.next(AuthService.parseJwt(token.access_token));
  }
}
