import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
// import { passwordMatchValidator } from 'path-to-password-match-validator';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  signUpForm: FormGroup;
url = "https://entertainment-api-e1wq.onrender.com";

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        repeat: ['', [Validators.required, Validators.minLength]],
      },
    );
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get repeat() {
    return this.signUpForm.get('repeat');
  }

  passwordsMatch(): boolean {
    const password = this.signUpForm.get('password')?.value;
    const repeatPassword = this.signUpForm.get('repeat')?.value;
    return password === repeatPassword;
  }
  signUpObj: SignUp = new SignUp();

  signUp() {
    if (this.signUpForm.valid && this.passwordsMatch()) {
      const formData = this.signUpForm.value;
      const localUsers = localStorage.getItem('entertainment-users');
      
      this.http.post(this.url + "/register", {
        "email": formData.email,
        "password": formData.password
      }).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      })
  
      if (localUsers != null) {
        const users = JSON.parse(localUsers);
        const isUserPresent = users.find((user: any) => user.email === formData.email);
        if (isUserPresent !== undefined) {
          alert("User already exists");
          return;
        }
        users.push(formData);
        localStorage.setItem('entertainment-users', JSON.stringify(users));
      } else {
        const users = [formData];
        localStorage.setItem('entertainment-users', JSON.stringify(users));
      }
      
      localStorage.setItem('token', 'Sign up worked')
      this.router.navigate(['/home'])
    }
  }
}


export class SignUp{
  email:string;
  password:string;
  repeate: string;

  constructor(){
    this.email = "";
    this.password = "";
    this.repeate = "";
  }

}