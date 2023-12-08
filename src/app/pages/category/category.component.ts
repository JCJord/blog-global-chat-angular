import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, CategoryService } from 'src/app/services/category.service';
import { Post, PostResponse, PostService } from 'src/app/services/post.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  posts!: any;
  category!: Category;
  id!: number;
  isLoading: boolean = true;
  pageMeta!: {current_page: number, last_page: number};

  private subs = new SubSink();

  observer = {
    next: (post: PostResponse) => {
      this.isLoading = false;
      this.pageMeta = {current_page: post.number, last_page: post.totalPages}
      this.posts = post.content;
      console.log(this.posts)
    },
    error: () => {
      this.isLoading = false;
      this.posts = [];
    },
    complete: () => {
    }
  };

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private postService: PostService, private categoryService: CategoryService) {}

  ngOnInit() {
    this.getPostsByCategoryId();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
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

  getPostsByCategoryId() {
    this.subs.sink = this.activatedRoute.params.subscribe(params => {
      const id =+ params['id'];
      this.id = id;
      console.log(this.id)
      this.getCategoryName(id);
      if(id) {
        this.postService.getPostsByCategoryId(id, 0)
        .subscribe(this.observer);
      }
    });
  }

  getCategoryName(id: number) {
    this.subs.sink = this.categoryService.getCategories()
    .subscribe((categories: Category[]) => {
      const selectedCategory = categories.find((category) => category.id === id);
      this.category = selectedCategory!;
    });
  }

  changePage(page: number, id:number) {
    this.isLoading = true;
    console.log(this.id)
    this.subs.sink = this.postService.getPostsByCategoryId(id, page).subscribe((postsArray: PostResponse) => {
      this.posts = postsArray.content;
      this.isLoading = false;
    });
  }
}
