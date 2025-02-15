import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private autService: AuthService, private router: Router) {}

  login() : void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password';
      return;
    }

    this.autService.login(this.email, this.password).subscribe({
      next: (respose) => {
        
        localStorage.setItem('token', respose.user.token);
        localStorage.setItem('firstName', respose.user.firstName);
        localStorage.setItem('lastName', respose.user.lastName);

        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.log('Error logging in', error);
        this.errorMessage = 'Invalid email or password';
      }
    })
  }
}
