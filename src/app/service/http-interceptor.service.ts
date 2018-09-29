import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Token } from '../domain/token';
import { JwtDecode } from '../domain/jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  
  private accessToken: String;

  constructor(private authService: AuthService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadAccessToken();
    console.log(this.authService.accessToken);
    const cloneReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.accessToken)
    });
    return next.handle(this.isValidUrlRequestToChange(req) ? cloneReq : req)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (this.isHttpResponse(event)) console.log(event);
        }),
        catchError((event: HttpEvent<any>) => {
          if (this.isHttpErroResponse(event)) console.log(event);
          return throwError(event)
        })
      );
  }

  private isHttpResponse(event: HttpEvent<any>): boolean {
    return event instanceof HttpResponse;
  }

  private isHttpErroResponse(event: HttpEvent<any>): boolean {
    return event instanceof HttpErrorResponse;
  }

  private isValidUrlRequestToChange(req: HttpRequest<any>): boolean {
    return req.url !== environment.API_AUTH;
  }

  private loadAccessToken(): void {
    AuthService.jwtDecode.pipe(take(1)).subscribe((jwtDecode: JwtDecode) => this.accessToken = this.authService.isLoggin ? jwtDecode.access_token : null);
  }
}
