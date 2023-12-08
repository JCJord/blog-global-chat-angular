import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/entities/user.type';
import { UserDTO } from 'src/app/core/models/UserDTO';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy{
  user?: User;
  profileSubscription = new Subscription();

  constructor(private session: SessionService, private userService: UserService) {
  }

  ngOnInit() {
    this.loadUser();
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
  }

  loadUser() {
    this.session
    .getSignedUser()
    .subscribe((user: User) => {
      user.avatar = user.avatar;
      this.user = user;
      console.log(this.user)
    });
  }

  saveImage(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile = inputElement.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);

      reader.onload = (e) => {
        const avatar: string | undefined = e.target!.result!.toString();
        this.user!.avatar = avatar;

        const userDTO = new UserDTO();
        userDTO.setAvatar(btoa(avatar!.toString()));
        console.log(atob(userDTO.getAvatar()))
        this.profileSubscription = this.userService.saveUserData(userDTO).subscribe();
      }
    }
  } 
}
