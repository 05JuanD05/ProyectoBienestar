import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronogramaActividadesInstructorComponent } from './cronograma-actividades-instructor.component';

describe('CronogramaActividadesInstructorComponent', () => {
  let component: CronogramaActividadesInstructorComponent;
  let fixture: ComponentFixture<CronogramaActividadesInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CronogramaActividadesInstructorComponent]
    });
    fixture = TestBed.createComponent(CronogramaActividadesInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
