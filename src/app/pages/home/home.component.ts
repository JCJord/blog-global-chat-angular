import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/entities/user.type';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PostService, Post, PostResponse } from 'src/app/services/post.service';
import { SessionService } from 'src/app/services/session.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  posts!: Array<Post>;
  user?: User;
  isLoading: boolean = true;
  pageMeta!: {current_page: number, last_page: number};

  private subs = new SubSink();

  constructor(
    private postService: PostService,
    private router: Router,
    private sessionService: SessionService,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.loadPosts();
    this.loadUser();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  
  loadPosts() {
    this.isLoading = true;
    this.subs.sink = this.postService.getPosts(0).subscribe((postsArray: PostResponse) => {
      console.log(postsArray)
      this.pageMeta = {current_page: postsArray.number, last_page: postsArray.totalPages}
      this.posts = postsArray.content;
      this.isLoading = false;
    });
  }

  loadUser() {
    if(this.authenticationService.isAuthenticated()) {
      this.subs.sink = this.sessionService
      .getSignedUser()
      .subscribe((user: User) => {
        this.user = user;
      });
  
      this.subs.sink = this.sessionService.loginExpired()
      .subscribe(() => {
        this.user = undefined;
      });
    }
  }

  changePage(page: number) {
    this.isLoading = true;
    this.subs.sink = this.postService.getPosts(page).subscribe((postsArray: PostResponse) => {
      this.posts = postsArray.content;
      this.isLoading = false;
    });
  }

  goToCreatePost() { 
    this.router.navigate(['/post']);
  }
  
  goToUpdatePost(postId: number) {
    this.router.navigate([`/post/${postId}`]);
  }

  goToPostPage(postId: number) {
    this.router.navigate([`/post-item/${postId}`]);
  }

  goToCategoryPage(categoryId: number) {
    this.router.navigate([`/category/${categoryId}`]);
  }

  convertDateFormat(date: Date) {
    const inputDate = new Date(date);

    const months = [
      'Jan', 'Feb', 'Mar', 'Apr',
      'May', 'Jun', 'Jul', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    return `${months[inputDate.getMonth()]} ${inputDate.getDate()}, ${inputDate.getFullYear()}`;
  }

  isUserPostOwner(userId: number) {
    return this.user?.id == userId;
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe();
    this.posts = this.posts.filter((post)=> post.id != postId);
  }

  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }
}
