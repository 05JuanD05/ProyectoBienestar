import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionJobsComponent } from './gestion-jobs.component';

describe('GestionJobsComponent', () => {
  let component: GestionJobsComponent;
  let fixture: ComponentFixture<GestionJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionJobsComponent]
    });
    fixture = TestBed.createComponent(GestionJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
