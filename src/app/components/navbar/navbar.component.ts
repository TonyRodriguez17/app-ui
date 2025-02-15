import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  firstLetter: string = '';
  page: string = '';

  constructor(private router: Router) {}

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
}
