import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/entities/user.type';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:8080/api/chat';

  constructor(private http: HttpClient) {
  }

  public getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}/messages`);
  }

  public getOnlineUsers(): Observable<OnlineUser[]> {
    return this.http.get<OnlineUser[]>(`${this.apiUrl}/onlineUsers`);
  }
}

export type Message = {
  id: number;
  message: string;
  user: User;
};

export type OnlineUser = {
  id: number;
  user: User;
};
