import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, UntypedFormControl } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDTO } from 'src/app/core/models/UserDTO';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnDestroy{
  loginSubscription!: Subscription;
  
  errorMessage!: string;
    
  loginForm = new FormGroup({
    username: new UntypedFormControl({value: undefined, disabled: false}, [Validators.required]),
    password: new UntypedFormControl({value: undefined, disabled: false}, [Validators.required])
  });

  observer = {
    next: (userData: any) => {
      localStorage.setItem('token', JSON.stringify(userData))
      console.log(userData)
    },
    error: () => {
      this.errorMessage = "Username or password are incorrect !"
    },
    complete: () => {
      this.route.navigate(['/']);
    }
  };
  
  
  constructor(private authenticationService: AuthenticationService, private route: Router) {}

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  login(){
    if(this.loginForm.valid) {
      const userDTO = new UserDTO();
      userDTO.setUsername(this.loginForm.get('username')!.value)
      userDTO.setPassword(this.loginForm.get('password')!.value);

      this.loginSubscription = this.authenticationService.signIn(userDTO)
      .subscribe((this.observer));
    }
  }
}
