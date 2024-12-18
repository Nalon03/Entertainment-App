import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LoginComponent, Login } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: Router, useValue: { navigate: jest.fn() } }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /home if login is successful', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });

    jest.spyOn(localStorage, 'getItem').mockReturnValue(null);
    jest.spyOn(localStorage, 'setItem');

    component.login();

    const req = httpMock.expectOne(
      'https://entertainment-api-e1wq.onrender.com/login'
    );
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'Okayyy Yes');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'ent-users',
      JSON.stringify([{ email: 'test@example.com', password: 'password123' }])
    );

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  afterEach(() => {
    httpMock.verify();
    jest.clearAllMocks();
  });
});
