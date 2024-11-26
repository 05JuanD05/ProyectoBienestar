import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesEliminacionComponent } from './solicitudes-eliminacion.component';

describe('SolicitudesEliminacionComponent', () => {
  let component: SolicitudesEliminacionComponent;
  let fixture: ComponentFixture<SolicitudesEliminacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudesEliminacionComponent]
    });
    fixture = TestBed.createComponent(SolicitudesEliminacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
