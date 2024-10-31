import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioCulturalComponent } from './horario-cultural.component';

describe('HorarioCulturalComponent', () => {
  let component: HorarioCulturalComponent;
  let fixture: ComponentFixture<HorarioCulturalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorarioCulturalComponent]
    });
    fixture = TestBed.createComponent(HorarioCulturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
