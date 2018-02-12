import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeakComponent } from './leak.component';

describe('LeakComponent', () => {
  let component: LeakComponent;
  let fixture: ComponentFixture<LeakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
