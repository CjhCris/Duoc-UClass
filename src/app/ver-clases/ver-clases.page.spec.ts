import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerClasesPage } from './ver-clases.page';

describe('VerClasesPage', () => {
  let component: VerClasesPage;
  let fixture: ComponentFixture<VerClasesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerClasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
