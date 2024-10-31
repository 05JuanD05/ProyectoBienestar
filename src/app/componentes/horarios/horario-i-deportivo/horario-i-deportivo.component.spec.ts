import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioIDeportivoComponent } from './horario-i-deportivo.component';

describe('HorarioIDeportivoComponent', () => {
  let component: HorarioIDeportivoComponent;
  let fixture: ComponentFixture<HorarioIDeportivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorarioIDeportivoComponent]
    });
    fixture = TestBed.createComponent(HorarioIDeportivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
