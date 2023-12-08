import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { User } from '../core/entities/user.type';
import { UserDTO } from '../core/models/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  userData = new Subject<UserDTO>();

  constructor(private http: HttpClient) { }

  public getSignedUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/listUser`).pipe(map((user: User) => {
      return {
        id: user.id,
        username: user.username,
        avatar: user.avatar ? atob(user.avatar) : undefined
      };
    }))
  }

  public saveUserData(userDTO: UserDTO) {
    this.userData.next(userDTO);
    return this.http.post<void>(`${this.apiUrl}/updateUser`, userDTO);
  }

  public getCurrentUserData(): Observable<UserDTO> {
    return this.userData.asObservable()
  }
}
