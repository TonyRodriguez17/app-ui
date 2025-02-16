import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  firstLetter: string = '';
  page: string = '';
  isMenuOpen: boolean = false;

  constructor(private router: Router, private elementRef: ElementRef) {}

  ngOnInit() {
    const firstName = localStorage.getItem('firstName');
    if (firstName) {
      this.firstLetter = firstName.charAt(0).toUpperCase();
    }

    const lastName = localStorage.getItem('lastName');
    if (lastName) {
      this.firstLetter += lastName.charAt(0).toUpperCase();
    }

    const currentPage = this.router.url.split('/');
    this.page = currentPage[currentPage.length - 1];
    this.page = this.capitalizeFirstLetter(this.page);
  }

  capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.isMenuOpen = false; // Cierra el menú después de cerrar sesión
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  // Detecta clics fuera del menú para cerrarlo
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }
}
