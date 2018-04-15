import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTripViewComponent } from './modify-trip-view.component';

describe('ModifyTripViewComponent', () => {
  let component: ModifyTripViewComponent;
  let fixture: ComponentFixture<ModifyTripViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyTripViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyTripViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
