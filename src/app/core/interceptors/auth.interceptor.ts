import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SessionService } from 'src/app/services/session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService,
      private sessionService: SessionService) {
    }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.authenticationService.getToken(); // Replace with your actual token
    if (!authToken) {
      return next.handle(request);
    }else {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken.accessToken}`,
        },
      });
  
      return next.handle(authRequest).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 401){
            this.sessionService.signOut();
          }
  
          return throwError(error);
        })
      );

    }
  }
}