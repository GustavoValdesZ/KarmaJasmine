import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { NavController, AlertController, IonicModule } from '@ionic/angular';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);

    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],  // Agregado IonicModule
      declarations: [LoginPage],
      providers: [
        { provide: NavController, useValue: navCtrlSpy },
        { provide: AlertController, useValue: alertControllerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // Validaciones para el usuario
  it('debería retornar true para un usuario válido', () => {
    expect(component['validarUsuario']('user123')).toBeTrue();
  });

  it('debería retornar false para un usuario con menos de 3 caracteres', () => {
    expect(component['validarUsuario']('us')).toBeFalse();
  });

  it('debería retornar false para un usuario con más de 8 caracteres', () => {
    expect(component['validarUsuario']('user12345')).toBeFalse();
  });

  it('debería retornar false para un usuario con caracteres especiales', () => {
    expect(component['validarUsuario']('user@123')).toBeFalse();
  });

  // Validaciones para la contraseña
  it('debería retornar true para una contraseña de 4 dígitos', () => {
    expect(component['validarPassword']('1234')).toBeTrue();
  });

  it('debería retornar false para una contraseña con menos de 4 dígitos', () => {
    expect(component['validarPassword']('123')).toBeFalse();
  });

  it('debería retornar false para una contraseña con más de 4 dígitos', () => {
    expect(component['validarPassword']('12345')).toBeFalse();
  });

  it('debería retornar false para una contraseña con caracteres no numéricos', () => {
    expect(component['validarPassword']('12a4')).toBeFalse();
  });

  // Pruebas de login con alertas
  it('debería mostrar una alerta si el usuario es inválido', async () => {
    component.usuario = ''; // Usuario vacío
    component.contrasena = '1234'; // Contraseña válida

    await component.login();

    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'El usuario debe tener entre 3 y 8 caracteres alfanuméricos.',
      buttons: ['OK'],
    });
  });

  it('debería mostrar una alerta si la contraseña está vacía', async () => {
    component.usuario = 'user123'; // Usuario válido
    component.contrasena = ''; // Contraseña vacía

    await component.login();

    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'La contraseña no puede estar vacía.',
      buttons: ['OK'],
    });
  });

  it('debería mostrar una alerta si la contraseña es inválida', async () => {
    component.usuario = 'user123'; // Usuario válido
    component.contrasena = 'abc'; // Contraseña no válida

    await component.login();

    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Error',
      message: 'La contraseña debe ser de 4 dígitos numéricos.',
      buttons: ['OK'],
    });
  });

  it('debería navegar a /home si las credenciales son correctas', async () => {
    const navControllerSpy = TestBed.inject(NavController) as jasmine.SpyObj<NavController>;
    spyOn(localStorage, 'setItem'); // Espía para localStorage

    component.usuario = 'user123'; // Usuario válido
    component.contrasena = '1234'; // Contraseña válida

    await component.login();

    expect(localStorage.setItem).toHaveBeenCalledWith('usuario', 'user123');
    expect(navControllerSpy.navigateForward).toHaveBeenCalledWith(['/home'], {
      queryParams: { usuario: 'user123' },
    });
  });
});
