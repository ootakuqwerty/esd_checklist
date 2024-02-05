import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgaReportsComponent } from './sga-reports.component';

describe('SgaReportsComponent', () => {
  let component: SgaReportsComponent;
  let fixture: ComponentFixture<SgaReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SgaReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SgaReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
