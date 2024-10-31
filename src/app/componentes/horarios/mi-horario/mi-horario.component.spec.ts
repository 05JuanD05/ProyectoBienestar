import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiHorarioComponent } from './mi-horario.component';

describe('MiHorarioComponent', () => {
  let component: MiHorarioComponent;
  let fixture: ComponentFixture<MiHorarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiHorarioComponent]
    });
    fixture = TestBed.createComponent(MiHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
