import { CommaSeperatedValuesDirective } from './comma-seperated-values.directive';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('CommaSeperatedValuesDirective', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TestHostComponent, CommaSeperatedValuesDirective]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('model => view', () => {
    it('should serialize correctly', () => {
      component.control.setValue(['foo', 'bar', 'baz']);
      fixture.detectChanges();
      expect(getInput(fixture).nativeElement.value).toEqual('foo, bar, baz');
    });
  });

  describe('view => model', () => {
    it('should deserialize correctly', () => {
      getInput(fixture).triggerEventHandler('input', { target: { value: 'Foo, Bar, Baz, Bae' } });
      fixture.detectChanges();
      expect(component.control.value).toEqual(['Foo', 'Bar', 'Baz', 'Bae']);
    });
  });

  describe('other lifecycle hooks', () => {
    it('should not set the control to touched initially', () => {
      expect(component.control.pristine).toBe(true);
    });

    it('should set the control to touched on blur', () => {
      getInput(fixture).triggerEventHandler('blur', null);
      fixture.detectChanges();
      expect(component.control.touched).toBe(true);
    });

    it('should correctly set disabled state', () => {
      component.control.disable();
      fixture.detectChanges();
      expect(getInput(fixture).nativeElement.disabled).toBe(true);

      component.control.enable();
      fixture.detectChanges();
      expect(getInput(fixture).nativeElement.disabled).toBe(false);
    });
  });
});

@Component({
  template: `
    <input type="text" [formControl]="control" appCommaSeperatedValues>
  `
})
export class TestHostComponent {
  control = new FormControl([]);
}

function getInput(f: ComponentFixture<TestHostComponent>) {
  return f.debugElement.query(By.css('input'));
}
