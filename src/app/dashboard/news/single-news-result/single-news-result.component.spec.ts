import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleNewsResultComponent } from './single-news-result.component';

describe('SingleNewsResultComponent', () => {
  let component: SingleNewsResultComponent;
  let fixture: ComponentFixture<SingleNewsResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleNewsResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleNewsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
