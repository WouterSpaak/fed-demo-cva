import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';
import { BaseFieldsetComponent, ValidationErrorChange } from './base-fieldset.component';

export interface FormModel {
  name: string;
  toggle: boolean;
  range: number;
}

@Component({
  selector: 'app-compound-value',
  templateUrl: './compound-value.component.html',
  styleUrls: ['./compound-value.component.scss']
})
export class CompoundValueComponent extends BaseFieldsetComponent<FormModel> implements OnInit {
  @Input()
  validators: ValidatorFn[];
  @Input()
  asyncValidators: AsyncValidatorFn[];
  @Output()
  readonly validationErrorChange = new EventEmitter<ValidationErrorChange>();

  protected readonly form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    toggle: new FormControl(false, [Validators.requiredTrue]),
    range: new FormControl(0, [Validators.min(10), Validators.max(100)])
  });

  setTouched() {
    this.onTouched();
  }
}
