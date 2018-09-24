import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Token } from '../domain/token';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  
  private token: Token; 

  constructor() { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadAccessToken();
    const cloneReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.token.access_token)
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
    AuthService.token.pipe(take(1)).subscribe((token: Token) => this.token = token);
  }
}
