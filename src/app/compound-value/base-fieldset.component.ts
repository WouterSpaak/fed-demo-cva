import {
  FormGroup,
  ControlValueAccessor,
  NgControl,
  ValidationErrors,
  ValidatorFn,
  AsyncValidatorFn,
  Validators,
  AbstractControl,
  FormArray
} from '@angular/forms';
import { Injectable, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface ControlErrorPair {
  [control: string]: ControlErrorPair | ValidationErrors | null;
}

export class ValidationErrorChange {
  static reduceErrors(control: AbstractControl): ControlErrorPair {
    const result: ControlErrorPair = {};
    const controlKeys = Object.keys((control as FormGroup | FormArray).controls);
    controlKeys.forEach(key => {
      const child = control.get(key);
      if (child instanceof FormGroup || child instanceof FormArray) {
        result[key] = ValidationErrorChange.reduceErrors(child);
      } else {
        result[key] = child.errors;
      }
    });
    return result;
  }

  constructor(readonly controls: ControlErrorPair | null) {}

  get(path: string) {
    const paths = path.split('.');
    const err = paths.reduce((accumulator, pathPart) => accumulator[pathPart], this.controls) as ControlErrorPair;
    return new ValidationErrorChange(err);
  }

  hasError(error: string) {
    return this.controls ? !!this.controls[error] : false;
  }

  getError(error: string) {
    return this.controls && this.hasError(error) ? this.controls[error] : null;
  }
}

@Injectable({
  providedIn: 'root'
})
export abstract class BaseFieldsetComponent<T> implements ControlValueAccessor, OnInit, OnDestroy {
  /** Should implement an `@Output` decorator. */
  abstract readonly validationErrorChange: EventEmitter<ValidationErrorChange>;

  /** Should implement an `@Input` decorator. */
  abstract readonly validators: ValidatorFn[] = [];

  /** Should implement an `@Input` decorator. */
  abstract readonly asyncValidators: AsyncValidatorFn[] = [];

  protected abstract readonly form: FormGroup;
  protected onTouched: () => void;

  private onChange: (val: T) => void;
  private readonly destroyed$ = new Subject<void>();

  constructor(private readonly parentControl: NgControl) {
    this.parentControl.valueAccessor = this;
  }

  /**
   * Should call this#onTouched.
   */
  protected abstract setTouched(): void;

  ngOnInit() {
    this.form.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(formValue => {
      this.validationErrorChange.emit(new ValidationErrorChange(ValidationErrorChange.reduceErrors(this.form)));
      this.onChange(formValue);
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  writeValue(obj: T | null): void {
    if (obj) {
      this.form.patchValue(obj);
    }
  }

  registerOnChange(fn: (val: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  protected updateValidators(validatorTuple: [ValidatorFn[], AsyncValidatorFn[]]) {
    const [syncValidators, asyncValidators] = validatorTuple;
    this.form.setValidators(Validators.compose([this.form.validator, ...syncValidators]));
    this.form.setAsyncValidators(Validators.composeAsync([this.form.asyncValidator, ...asyncValidators]));
  }
}
