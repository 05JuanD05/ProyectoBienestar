import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
import { HorarioIDeportivoComponent } from './horario-i-deportivo.component';

describe('HorarioIDeportivoComponent', () => {
  let component: HorarioIDeportivoComponent;
  let fixture: ComponentFixture<HorarioIDeportivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorarioIDeportivoComponent]
    });
    fixture = TestBed.createComponent(HorarioIDeportivoComponent);
=======
import { HorarioDeportivoComponent } from './horario-i-deportivo.component';

describe('HorarioDeportivoComponent', () => {
  let component: HorarioDeportivoComponent;
  let fixture: ComponentFixture<HorarioDeportivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorarioDeportivoComponent]
    });
    fixture = TestBed.createComponent(HorarioDeportivoComponent);
>>>>>>> Horarios
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
