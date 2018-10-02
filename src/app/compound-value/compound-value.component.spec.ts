import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundValueComponent } from './compound-value.component';

describe('CompoundValueComponent', () => {
  let component: CompoundValueComponent;
  let fixture: ComponentFixture<CompoundValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
