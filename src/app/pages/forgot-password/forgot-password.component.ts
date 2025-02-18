import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule,CommonModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';
  errorMessage: string = "";
  successMessage: string = "";
  emailSent: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  forgotPassword(): void {
    if(!this.email){
      this.errorMessage = "Por favor ingresa tu correo electrónico";
      return;
    }

    this.authService.forgotPassword(this.email).subscribe({
      next: (response) => {
        this.successMessage = "Se a enviado un correo con las instrucciones para restablecer tu contraseña";
        this.errorMessage = "";
        this.emailSent = true;
      },
      error: (error) => {
        console.error('Error al enviar el correo', error);
        this.errorMessage = "Ha ocurrido un error al enviar el correo";
      }
    });

  }
}
