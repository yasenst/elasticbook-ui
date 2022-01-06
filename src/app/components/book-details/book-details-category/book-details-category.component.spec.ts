import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsCategoryComponent } from './book-details-category.component';

describe('BookDetailsCategoryComponent', () => {
  let component: BookDetailsCategoryComponent;
  let fixture: ComponentFixture<BookDetailsCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDetailsCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
