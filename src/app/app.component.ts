import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly form = new FormGroup({
    frontenders: new FormControl([])
  });

  get frontenders(): string[] {
    return this.form.get('frontenders').value;
  }

  logAllTheThings() {
    console.log(this.form.value);
  }
}
