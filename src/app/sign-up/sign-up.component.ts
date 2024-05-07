import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  constructor(private fb: FormBuilder){}
    
    signUpForm= this.fb.group({
      email:['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password:['', [Validators.required, Validators.maxLength(5)]],
      repeat:['', Validators.required]
      
    });
    get email() {
      return this.signUpForm.get('email');
    }
    get password() {
      return this.signUpForm.get('password');
    }
  get repeat(){
    return this.signUpForm.get('repeat');
  }

  }

