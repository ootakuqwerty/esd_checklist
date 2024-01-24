import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsdCheckSheetsComponent } from './esd-check-sheets.component';

describe('EsdCheckSheetsComponent', () => {
  let component: EsdCheckSheetsComponent;
  let fixture: ComponentFixture<EsdCheckSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsdCheckSheetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsdCheckSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
