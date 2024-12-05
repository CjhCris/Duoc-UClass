import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearClasePage } from './crear-clase.page';

describe('CrearClasePage', () => {
  let component: CrearClasePage;
  let fixture: ComponentFixture<CrearClasePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearClasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
