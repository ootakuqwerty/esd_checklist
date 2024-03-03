import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsdReportListComponent } from './esd-report-list.component';

describe('EsdReportComponent', () => {
  let component: EsdReportListComponent;
  let fixture: ComponentFixture<EsdReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsdReportListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsdReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
