import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly form: FormGroup;

  get frontenders(): string {
    return this.form.get('frontenders').value;
  }
  constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      frontenders: null
    });
  }
}
