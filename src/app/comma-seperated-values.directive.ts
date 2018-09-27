import { Directive, Renderer2, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appCommaSeperatedValues]',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: CommaSeperatedValuesDirective, multi: true }]
})
export class CommaSeperatedValuesDirective implements ControlValueAccessor {
  private onChange: (val: string[]) => void;
  private onTouched: () => void;

  constructor(private readonly renderer: Renderer2, private readonly elementRef: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  handleInput(event: KeyboardEvent) {
    const inputVal = event.target['value'] as string;
    const newModelValue = inputVal
      .split(',')
      .map(str => str.trim())
      .filter(v => v.length > 0);

    this.onChange(newModelValue);
  }

  @HostListener('blur')
  handleBlur() {
    this.onTouched();
  }

  writeValue(obj: string[]): void {
    const newValue = obj.join(', ');
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', newValue);
  }

  registerOnChange(fn: (val: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
