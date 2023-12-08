import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './inputs/text-input/text-input.component';
import { SelectInputComponent } from './inputs/select-input/select-input.component';
import { PasswordInputComponent } from './inputs/password-input/password-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileInputComponent } from './inputs/file-input/file-input.component';
import { PrimaryButtonComponent } from './components/buttons/primary-button/primary-button.component';
import { PostsSkeletonComponent } from './components/posts-skeleton/posts-skeleton.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  declarations: [
    TextInputComponent,
    SelectInputComponent,
    PasswordInputComponent,
    FileInputComponent,
    PrimaryButtonComponent,
    PostsSkeletonComponent,
    PaginatorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TextInputComponent,
    SelectInputComponent,
    PasswordInputComponent,
    FormsModule,
    ReactiveFormsModule,
    FileInputComponent,
    PrimaryButtonComponent,
    PostsSkeletonComponent,
    PaginatorComponent
  ]
})
export class SharedModule { }
