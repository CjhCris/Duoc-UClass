import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignaturasProfesorPage } from './asignaturas-profesor.page';

describe('AsignaturasProfesorPage', () => {
  let component: AsignaturasProfesorPage;
  let fixture: ComponentFixture<AsignaturasProfesorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaturasProfesorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
