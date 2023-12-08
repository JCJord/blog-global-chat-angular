import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './pages/signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TextInputComponent } from './shared/inputs/text-input/text-input.component';
import { PasswordInputComponent } from './shared/inputs/password-input/password-input.component'
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { CreateOrUpdatePostComponent } from './pages/create-or-update-post/create-or-update-post.component';
import { SelectInputComponent } from './shared/inputs/select-input/select-input.component';
import { PostItemComponent } from './pages/post-item/post-item.component';
import { CategoryComponent } from './pages/category/category.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SharedModule } from './shared/shared.module';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { PostsInterceptor } from './core/interceptors/posts.interceptor';
import { ChatRoomComponent } from './pages/chat-room/chat-room.component';
import { rxStompServiceFactory } from './services/rx-stomp-service-factory';
import { RxStompService } from './services/rx-stomp.service';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    HeaderComponent,
    SignupComponent,
    CreateOrUpdatePostComponent,
    PostItemComponent,
    CategoryComponent,
    UserProfileComponent,
    ChatRoomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EditorModule,
    SharedModule,
  ],
  providers: [    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PostsInterceptor,
      multi: true,
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
