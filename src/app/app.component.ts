import { Component } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { ValidationErrorChange } from './compound-value/base-fieldset.component';
import { FormModel } from './compound-value/compound-value.component';

interface MyModel {
  frontenders: string[];
  foo: FormModel;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly form = new FormGroup({
    frontenders: new FormControl([]),
    foo: new FormControl(null)
  });

  get frontenders(): string[] {
    return this.form.get('frontenders').value;
  }

  logAllTheThings() {
    console.log(this.form.value);
  }

  logErrors(change: ValidationErrorChange) {
    console.log(change);
  }
}
