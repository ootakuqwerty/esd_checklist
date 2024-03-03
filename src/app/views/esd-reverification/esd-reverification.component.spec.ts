import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsdReverificationComponent } from './esd-reverification.component';

describe('EsdReverificationComponent', () => {
  let component: EsdReverificationComponent;
  let fixture: ComponentFixture<EsdReverificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsdReverificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsdReverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
