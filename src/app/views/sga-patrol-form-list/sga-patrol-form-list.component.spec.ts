import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgaPatrolFormListComponent } from './sga-patrol-form-list.component';

describe('SgaPatrolFormListComponent', () => {
  let component: SgaPatrolFormListComponent;
  let fixture: ComponentFixture<SgaPatrolFormListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SgaPatrolFormListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SgaPatrolFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
