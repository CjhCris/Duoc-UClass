import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearAsignaturaPage } from './crear-asignatura.page';

describe('CrearAsignaturaPage', () => {
  let component: CrearAsignaturaPage;
  let fixture: ComponentFixture<CrearAsignaturaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAsignaturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
