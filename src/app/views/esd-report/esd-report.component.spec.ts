import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsdReportComponent } from './esd-report.component';

describe('EsdReportComponent', () => {
  let component: EsdReportComponent;
  let fixture: ComponentFixture<EsdReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsdReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsdReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
