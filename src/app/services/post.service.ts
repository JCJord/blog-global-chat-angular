import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category.service';
import { PostDTO } from '../core/models/postDto';
import { User } from '../core/entities/user.type';

@Injectable({
  providedIn: 'root'
})  
export class PostService {
  private apiUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) { }

  public createPost(requestBody: PostDTO): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/create`, requestBody);
  }

  public updatePost(requestBody: PostDTO, postId: number): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/update/${postId}`, requestBody);
  }

  public getPosts(page: number): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${this.apiUrl}/listAllPosts?page=${page}&size=6`);
  }

  public getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/getById/${id}`);
  }

  public getPostsByCategoryId(id: number, page: number): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${this.apiUrl}/listByCategoryId/${id}?page=${page}&size=6`);
  }
  
  public deletePost(postId: number): Observable<Post> {
    return this.http.delete<Post>(`${this.apiUrl}/delete/${postId}`);
  }
}

export interface Post {
  id: number,
  title: string,
  content: string,
  user: User,
  category: Category,
  createdAt: Date
}

export interface PostResponse {
  content: Post[],
  number: number,
  totalPages: number,
}
