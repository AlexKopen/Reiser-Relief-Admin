import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionTripsComponent } from './mission-trips.component';

describe('MissionTripsComponent', () => {
  let component: MissionTripsComponent;
  let fixture: ComponentFixture<MissionTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MissionTripsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
