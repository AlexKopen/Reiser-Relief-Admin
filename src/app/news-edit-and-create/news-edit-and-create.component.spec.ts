import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsEditAndCreateComponent } from './news-edit-and-create.component';

describe('NewsEditAndCreateComponent', () => {
  let component: NewsEditAndCreateComponent;
  let fixture: ComponentFixture<NewsEditAndCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsEditAndCreateComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsEditAndCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
