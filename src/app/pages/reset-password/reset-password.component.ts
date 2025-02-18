import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  token: string = '';
  success: boolean = false;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        this.errorMessage = 'Token inválido.';
        this.router.navigate(['/login']);
      }
    });
  }

  resetPassword(): void {
    if(!this.newPassword || !this.confirmPassword) {
      this.errorMessage = "Por favor ingresa ambas contraseñas.";
      return;
    }

    if(this.newPassword !== this.confirmPassword) {
      this.errorMessage = "Las contraseñas no coinciden.";
      return;
    }

    console.log("Datos enviados:", { token: this.token, newPassword: this.newPassword });

    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: () => {
        this.successMessage = 'Contraseña actualizada correctamente.';
        this.errorMessage = '';
        this.success = true;
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (error) => {
        console.error('Error al restablecer contraseña', error);
        this.errorMessage = 'No se pudo restablecer la contraseña.';
      }
    });
  }
}
