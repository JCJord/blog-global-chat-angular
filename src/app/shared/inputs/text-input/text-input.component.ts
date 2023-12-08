import { Component, Input } from '@angular/core';
import { UntypedFormControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent {
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

  hasError(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  getErrorMessage() {
    if (this.control.hasError('required')) {
      return `${this.name} is required`;
    }
    if (this.control.hasError('alreadySigned')) {
      return `${this.name} is already taken`;

    }
    if (this.control.hasError('minlength')) {
      const minLength = this.control.errors!['minlength'].requiredLength;
      return `${this.name} must be at least ${minLength} characters long`;
    }
    // Add more error checks as needed
    return 'Invalid username';
  }

}
