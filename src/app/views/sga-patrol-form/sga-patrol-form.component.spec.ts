import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgaPatrolFormComponent } from './sga-patrol-form.component';

describe('SgaPatrolFormComponent', () => {
  let component: SgaPatrolFormComponent;
  let fixture: ComponentFixture<SgaPatrolFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SgaPatrolFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SgaPatrolFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
