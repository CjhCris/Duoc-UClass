import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresarPage } from './ingresar.page';

describe('IngresarPage', () => {
  let component: IngresarPage;
  let fixture: ComponentFixture<IngresarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
