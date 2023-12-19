import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckSheetsComponent } from './check-sheets.component';

describe('CheckSheetsComponent', () => {
  let component: CheckSheetsComponent;
  let fixture: ComponentFixture<CheckSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckSheetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
