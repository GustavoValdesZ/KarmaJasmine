import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CameraPage } from './camara.page';  // Importa 'CameraPage' en lugar de 'CamaraPage'

describe('CameraPage', () => {  // Asegúrate de que también coincida el nombre en el 'describe'
  let component: CameraPage;  // Aquí también usa 'CameraPage'
  let fixture: ComponentFixture<CameraPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraPage],  // Asegúrate de declarar 'CameraPage' en el TestBed
    }).compileComponents();  // Asegúrate de compilar los componentes antes de usarlos

    fixture = TestBed.createComponent(CameraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Detecta cambios en la vista
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
