import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category, CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { Option } from 'src/app/shared/inputs/select-input/select-input.component';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { PostDTO } from 'src/app/core/models/postDto';
import { User } from 'src/app/core/entities/user.type';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-create-or-update-post',
  templateUrl: './create-or-update-post.component.html',
  styleUrls: ['./create-or-update-post.component.scss']
})
export class CreateOrUpdatePostComponent implements OnInit, OnDestroy {
  public categoriesList!: Array<Option>;
  public categories!: Array<Category>;
  @ViewChild('editor') editor!: EditorComponent;

  private subs = new SubSink();

  observer = {
    next: () => {
    },
    error: () => {
    },
    complete: () => {
      this.router.navigate(['/']);
    }
  };


  constructor(private categoryService: CategoryService,
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.loadCategories();
    this.getItemById();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getItemById() {
    this.activatedRoute.params.subscribe(params => {
      const id =+ params['id'];

      if(id) {
        this.subs.sink = this.postService.getPostById(id)
        .subscribe((postItem: Post) => {

          this.postForm.patchValue({ id: postItem.id, title: postItem.title, content: postItem.content, category: postItem.category.name });
        });
      }
    });
  }

  postForm = new UntypedFormGroup({
    id: new UntypedFormControl({value: undefined, disabled: false}),
    title: new UntypedFormControl({value: undefined, disabled: false}, [Validators.required]),
    content: new UntypedFormControl({value: undefined, disabled: false}, [Validators.required]),
    category: new UntypedFormControl({value: 'Sports', disabled: false}, [Validators.required]),
  });

  loadCategories() {
    this.subs.sink = this.categoryService.getCategories()
    .subscribe((categories: Array<Category>) => {
      this.categories = categories;
      this.categoriesList = categories.map(category => ({
        label: category.name,
        value: category.name
      }))
    });
  }

  createPost() {
    const categoryId = this.categories.find((value) => value.name == this.postForm.value.category)!.id;
    const postDTO: PostDTO = new PostDTO(); 

    postDTO.setTitle(this.postForm.get('title')!.value);
    postDTO.setContent(this.postForm.get('content')!.value);
    postDTO.setCategory({ id: categoryId });

    this.subs.sink = this.postService.createPost(postDTO).subscribe((this.observer));
  }

  updatePost() {
    const categoryId = this.categories.find((value) => value.name == this.postForm.value.category)!.id;
    const postId = this.postForm.get('id')!.value;
    const postDTO: PostDTO = new PostDTO(); 

    postDTO.setTitle(this.postForm.get('title')!.value);
    postDTO.setContent(this.postForm.get('content')!.value);
    postDTO.setCategory({ id: categoryId });
    
    this.subs.sink = this.postService.updatePost(postDTO, postId).subscribe((this.observer));
  }
  
  isFormUpdate() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    return id != undefined;
  }

}

type Post = {
  id: number,
  title: string,
  content: string,
  user: Partial<User>,
  category: Partial<Category>
}