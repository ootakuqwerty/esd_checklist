import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsdReverificationListComponent } from './esd-reverification-list.component';

describe('EsdReverificationListComponent', () => {
  let component: EsdReverificationListComponent;
  let fixture: ComponentFixture<EsdReverificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsdReverificationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsdReverificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
