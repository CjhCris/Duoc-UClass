import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleCursoEstudiantePage } from './detalle-curso-estudiante.page';

describe('DetalleCursoEstudiantePage', () => {
  let component: DetalleCursoEstudiantePage;
  let fixture: ComponentFixture<DetalleCursoEstudiantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCursoEstudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
