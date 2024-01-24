import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgaCheckSheetComponent } from './sga-check-sheet.component';

describe('SgaCheckSheetComponent', () => {
  let component: SgaCheckSheetComponent;
  let fixture: ComponentFixture<SgaCheckSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SgaCheckSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SgaCheckSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
