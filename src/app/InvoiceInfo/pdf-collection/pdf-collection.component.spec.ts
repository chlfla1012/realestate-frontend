import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfCollectionComponent } from './pdf-collection.component';

describe('PdfCollectionComponent', () => {
  let component: PdfCollectionComponent;
  let fixture: ComponentFixture<PdfCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
