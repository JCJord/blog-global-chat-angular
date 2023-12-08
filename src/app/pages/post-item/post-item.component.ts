import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post, PostService } from 'src/app/services/post.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit, OnDestroy{
  post!: any;
  isLoading: boolean = true;

  private subs = new SubSink();

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private router: Router) {
  }

  ngOnInit() {
    this.getItemById();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
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

  getItemById() {
    this.activatedRoute.params.subscribe(params => {
      const id =+ params['id'];
      if(id) {
      this.subs.sink =  this.postService.getPostById(id)
        .subscribe((postItem: Post) => {
          this.post = postItem;
          this.isLoading = false;
        });
      }
    });
  }

  goToPostPage(postId: number) {
    this.router.navigate([`/post-item/${postId}`]);
  }

  goToCategoryPage(categoryId: number) {
    this.router.navigate([`/category/${categoryId}`]);
  }
}
