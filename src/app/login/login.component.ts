import { Component, ElementRef, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgClass,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  url = 'https://entertainment-api-e1wq.onrender.com';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      const localUsers = localStorage.getItem('ent-users');

      this.http
        .post(this.url + '/login', {
          email: formData.email,
          password: formData.password,
        })
        .subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
        });

      if (localUsers != null) {
        const users = JSON.parse(localUsers);
        users.push(formData);
        localStorage.setItem('ent-users', JSON.stringify(users));
      } else {
        const users = [formData];
        localStorage.setItem('ent-users', JSON.stringify(users));
      }

      localStorage.setItem('token', 'Okayyy Yes');
      this.router.navigate(['/home']);
    }
  }

  loginObj: Login = new Login();
}

export class Login {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}
