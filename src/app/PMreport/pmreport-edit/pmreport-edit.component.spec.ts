import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmreportEditComponent } from './pmreport-edit.component';

describe('PmreportEditComponent', () => {
  let component: PmreportEditComponent;
  let fixture: ComponentFixture<PmreportEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmreportEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmreportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
