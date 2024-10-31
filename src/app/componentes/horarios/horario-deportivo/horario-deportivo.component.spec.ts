import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioDeportivoComponent } from './horario-deportivo.component';

describe('HorarioDeportivoComponent', () => {
  let component: HorarioDeportivoComponent;
  let fixture: ComponentFixture<HorarioDeportivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorarioDeportivoComponent]
    });
    fixture = TestBed.createComponent(HorarioDeportivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
