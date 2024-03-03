import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgaCheckSheetListComponent } from './sga-check-sheet-list.component';

describe('SgaCheckSheetListComponent', () => {
  let component: SgaCheckSheetListComponent;
  let fixture: ComponentFixture<SgaCheckSheetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SgaCheckSheetListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SgaCheckSheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
