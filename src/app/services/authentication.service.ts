import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../core/models/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  public signIn(userDTO: UserDTO): Observable<TokenData> {
    return this.http.post<TokenData>(`${this.apiUrl}/login`, userDTO);
  }

  public signUp(userDTO: UserDTO) {
    return this.http.post(`${this.apiUrl}/register`, userDTO, { responseType: 'text' });
  }
  
  public getToken() {
    return JSON.parse(localStorage.getItem('token') as any);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token != undefined ? true : false; // Return true if token exists, false if not
  }  
}

export interface TokenData {
  accessToken: string,
  tokenType: string,
  userId: number,
  username: string
}