import { TestBed } from '@angular/core/testing';

import { ProveedorCursosService } from './proveedor-cursos.service';

describe('ProveedorCursosService', () => {
  let service: ProveedorCursosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProveedorCursosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
