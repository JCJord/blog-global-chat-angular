import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../core/entities/user.type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  signOutObserver = new Subject<void>;

  constructor(private userService: UserService, private router: Router) { }

  public signOut(): void {
    localStorage.removeItem('token');
    this.signOutObserver.next();
    this.router.navigate(['/signin']);
  }

  public getSignedUser(): Observable<User> {
    return this.userService.getSignedUser();
  }

  loginExpired() {
    return this.signOutObserver.asObservable();
  }
}
