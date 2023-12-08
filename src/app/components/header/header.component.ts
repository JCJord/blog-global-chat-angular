import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/entities/user.type';
import { UserDTO } from 'src/app/core/models/UserDTO';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Category, CategoryService } from 'src/app/services/category.service';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  username!: string;
  profilePic!: string | undefined;
  userLoaded: boolean = false;
  categories!: Category[];
  
  private subs = new SubSink();

  
  constructor(private authenticationService: AuthenticationService,
    private sessionService: SessionService,
    private categoryService: CategoryService,
    private userService: UserService,
    private router: Router) {

  }

  ngOnInit() {
    this.getUsername();
    this.headerRefresh();
    this.getCategories();
    this.watchUserChange();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getUsername() {
    if(this.authenticationService.isAuthenticated()) {
      this.subs.sink = this.userService.getSignedUser()
      .subscribe((user: User) => {
        user.username == 'anonymousUser' ? this.username = '' : this.username = user.username;
        this.profilePic = user.avatar?.toString();
      });
      this.userLoaded = true;
    }
  }

  signOut() {
    this.sessionService.signOut();
  }

  isUserAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

  headerRefresh() {
    this.subs.sink = this.sessionService.loginExpired()
    .subscribe(()=> {
      this.username = '';
    })
  }
  
  watchUserChange() {
    this.subs.sink = this.userService.getCurrentUserData()
    .subscribe((user: UserDTO) => {
      this.profilePic = atob(user.getAvatar());
    });
  }

  getCategories() {
    this.subs.sink = this.categoryService.getCategories()
    .subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  goToCategoryPage(categoryId: number) {
    this.router.navigate([`/category/${categoryId}`]);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
