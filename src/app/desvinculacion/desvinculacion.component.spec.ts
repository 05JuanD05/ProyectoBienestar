import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesvinculacionComponent } from './desvinculacion.component';

describe('DesvinculacionComponent', () => {
  let component: DesvinculacionComponent;
  let fixture: ComponentFixture<DesvinculacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesvinculacionComponent]
    });
    fixture = TestBed.createComponent(DesvinculacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
