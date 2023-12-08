import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Post, PostResponse } from 'src/app/services/post.service';

@Injectable()
export class PostsInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if this is the request you want to intercept

    if (request.url.includes('/listAllPosts')) {
        
        console.log("include all posts")
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                console.log(event.body)
                const decodedContent = event.body.content
                .map((post: Post) => {
                  return {
                    id: post.id,
                    title: post.title,
                    content: atob(post.content),
                    user: { id: post.user.id, username: post.user.username, avatar: post.user.avatar ? atob(post.user.avatar!) : undefined },
                    category: post.category,
                    createdAt: post.createdAt
                  }
                })

                const post = {
                  number: event.body.number,
                  totalPages: event.body.totalPages,
                  content: decodedContent,
                }

                return event.clone({ body: post });
              }
              return event;
            })
          );
    }

    if (request.url.includes('/getById')) {
        
      console.log("post by id")
      return next.handle(request).pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              const postResponse = event.body;
              const post = {
                id: postResponse.id,
                title: postResponse.title,
                content: atob(event.body.content),
                user: { 
                  id: postResponse.user.id,
                  username: postResponse.user.username,
                  avatar: postResponse.user.avatar ?  atob(postResponse.user.avatar) : undefined
                },
                category: postResponse.category,
                createdAt: postResponse.createdAt,
              };
              return event.clone({ body: post });
            }
            return event;
          })
        );
    }

    if (request.url.includes('/listByCategoryId')) {
        
      console.log("post by category id")
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log(event.body)
            const decodedContent = event.body.content
            .map((post: Post) => {
              return {
                id: post.id,
                title: post.title,
                content: atob(post.content),
                user: { id: post.user.id, username: post.user.username, avatar: post.user.avatar ? atob(post.user.avatar!) : undefined },
                category: post.category,
                createdAt: post.createdAt
              }
            })

            const post = {
              number: event.body.number,
              totalPages: event.body.totalPages,
              content: decodedContent,
            }

            return event.clone({ body: post });
          }
          return event;
        })
      );
    }


    // If it's not the request you want to intercept, pass it along unchanged
    return next.handle(request);
  }
}