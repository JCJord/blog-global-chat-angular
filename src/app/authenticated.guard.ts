import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService) {}

  canActivate(): boolean {
    if (this.authenticationService.isAuthenticated()) {
      return true;
    } else {
      return false; 
    }
  }
}
