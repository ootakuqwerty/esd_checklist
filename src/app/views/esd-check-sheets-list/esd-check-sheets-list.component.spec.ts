import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsdCheckSheetsListComponent } from './esd-check-sheets-list.component';

describe('EsdCheckSheetsListComponent', () => {
  let component: EsdCheckSheetsListComponent;
  let fixture: ComponentFixture<EsdCheckSheetsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsdCheckSheetsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsdCheckSheetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
