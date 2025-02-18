import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private autService: AuthService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token && token.trim() !== '') {
      this.router.navigate(['/dashboard']);
    }
  }

  login() : void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password';
      return;
    }

    this.autService.login(this.email, this.password).subscribe({
      next: (response) => {
        
        localStorage.setItem('token', response.user.token);
        localStorage.setItem('firstName', response.user.firstName);
        localStorage.setItem('lastName', response.user.lastName);

        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.log('Error logging in', error);
        this.errorMessage = 'Invalid email or password';
      }
    })
  }
}
