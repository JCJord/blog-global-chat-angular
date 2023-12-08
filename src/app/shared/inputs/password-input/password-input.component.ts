import { Component, Input } from '@angular/core';
import { UntypedFormControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent {
  @Input() 
  name!: string;

  @Input()
  label?: string;

  @Input() 
  id!: string;

  @Input()
  validAlert: boolean = true;
  
  control!: UntypedFormControl;

  constructor(
    private formGroup: FormGroupDirective,
  ) { }

  ngOnInit(): void {
    this.control = this.formGroup.form.get(this.name) as UntypedFormControl;
  }

  getErrorMessage() {
    if (this.control.hasError('genericError')) {
      return 'Password incorrect or this username does not exist';
    }
    if (this.control.hasError('required')) {
      return 'Password is required';
    }
    if (this.control.hasError('minlength')) {
      const minLength = this.control.errors!['minlength'].requiredLength;
      return `Password must be at least ${minLength} characters long`;
    }
    // Add more error checks as needed
    return 'Invalid password';
  }

  hasError(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

}
