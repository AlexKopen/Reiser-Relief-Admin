import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsResultsComponent } from './news-results.component';

describe('NewsResultsComponent', () => {
  let component: NewsResultsComponent;
  let fixture: ComponentFixture<NewsResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
