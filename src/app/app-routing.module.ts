import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth.guard';
import { SignupComponent } from './pages/signup/signup.component';
import { CreateOrUpdatePostComponent } from './pages/create-or-update-post/create-or-update-post.component';
import { AuthenticatedGuard } from './authenticated.guard';
import { PostItemComponent } from './pages/post-item/post-item.component';
import { CategoryComponent } from './pages/category/category.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ChatRoomComponent } from './pages/chat-room/chat-room.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SigninComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'post', component: CreateOrUpdatePostComponent, canActivate: [AuthenticatedGuard] },
  {
    path: 'chat', component: ChatRoomComponent, canActivate: [AuthenticatedGuard] 
  },
  {
    path: 'post/:id', component: CreateOrUpdatePostComponent, canActivate: [AuthenticatedGuard]
  },
  {
    path: 'post-item/:id', component: PostItemComponent
  },
  {
    path: 'category/:id', component: CategoryComponent
  },
  {
    path: 'profile', component: UserProfileComponent, canActivate: [AuthenticatedGuard]
  }
  
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
