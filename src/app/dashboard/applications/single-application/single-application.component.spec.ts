import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleApplicationComponent } from './single-application.component';

describe('SingleApplicationComponent', () => {
  let component: SingleApplicationComponent;
  let fixture: ComponentFixture<SingleApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
