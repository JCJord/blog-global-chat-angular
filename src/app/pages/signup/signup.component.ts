import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDTO } from 'src/app/core/models/UserDTO';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnDestroy{
  signupSubscription!: Subscription;

  errorMessage!: string;
  registerForm = new UntypedFormGroup({
    username: new UntypedFormControl({value: undefined, disabled: false}, [Validators.required, Validators.minLength(4)]),
    password: new UntypedFormControl({value: undefined, disabled: false}, [Validators.required, Validators.minLength(8)])
  });

  observer = {
    next: () => {
    },
    error: (error: any) => {
      console.log(error)
      this.errorMessage = "User already in use";
    },
    complete: () => {
      this.route.navigate(['/signin']);
    }
  };
  
  constructor(private authenticationService: AuthenticationService, private route: Router){

  }

  ngOnDestroy(): void {
    this.signupSubscription.unsubscribe();
  }

  register(){
    if(this.registerForm.valid) {
      const userDTO = new UserDTO();
      userDTO.setUsername(this.registerForm.get('username')!.value)
      userDTO.setPassword(this.registerForm.get('password')!.value);

      this.signupSubscription = this.authenticationService.signUp(userDTO)
      .subscribe(this.observer);
    }
  }
}