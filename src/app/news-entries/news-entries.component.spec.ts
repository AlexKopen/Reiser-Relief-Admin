import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsEntriesComponent } from './news-entries.component';

describe('NewsEntriesComponent', () => {
  let component: NewsEntriesComponent;
  let fixture: ComponentFixture<NewsEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsEntriesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
