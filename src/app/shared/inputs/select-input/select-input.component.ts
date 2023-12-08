import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  viewProviders: [
    {
        provide: ControlContainer,
        useExisting: FormGroupDirective
    }
]
})
export class SelectInputComponent {
  constructor(private formGroup: FormGroupDirective) { }

  @Input()
  name!: string;

  @Input()
  label?: string;

  @Input()
  id?: string;

  @Input()
  options!: Array<Option>;

  control!: UntypedFormControl;

  ngOnInit(): void {
    this.control = this.formGroup.form.get(this.name) as UntypedFormControl;
  }
  
  optionIdentifier(index: number, option: Option) {
      return option.value;
  }
}

export type Option = {
  label: string,
  value: string | number
}
