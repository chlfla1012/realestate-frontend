import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmreportCreateComponent } from './pmreport-create.component';

describe('PmreportCreateComponent', () => {
  let component: PmreportCreateComponent;
  let fixture: ComponentFixture<PmreportCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmreportCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmreportCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
