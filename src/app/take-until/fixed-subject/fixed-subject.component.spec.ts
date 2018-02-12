import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedSubjectComponent } from './fixed-subject.component';

describe('FixedSubjectComponent', () => {
  let component: FixedSubjectComponent;
  let fixture: ComponentFixture<FixedSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
