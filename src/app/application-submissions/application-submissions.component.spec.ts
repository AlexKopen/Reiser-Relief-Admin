import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSubmissionsComponent } from './application-submissions.component';

describe('ApplicationSubmissionsComponent', () => {
  let component: ApplicationSubmissionsComponent;
  let fixture: ComponentFixture<ApplicationSubmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationSubmissionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
