import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { PdfDownloadComponent } from './pdf-download.component';
import { InvoiceServiceService } from 'src/app/Service/InvoiceInfo/invoice-service.service';

describe('PdfDownloadComponent', () => {
  let component: PdfDownloadComponent;
  let fixture: ComponentFixture<PdfDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfDownloadComponent ],
      providers: [
        {
          provide: InvoiceServiceService,
          useValue: {
            uploadFile: () => of({}),
            getBcMail: () => of([]),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {},
            },
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustUrl: (value: string) => value,
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
