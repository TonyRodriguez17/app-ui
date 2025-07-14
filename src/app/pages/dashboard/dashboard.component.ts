import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Publication } from '../../models/publication.model';
import { PublicationsService } from '../../services/publications.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PublicationCardComponent } from '../../components/card/publication-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    NavbarComponent,
    PublicationCardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  publications: Publication[] = [];
  filteredPublications: Publication[] = [];
  search: string = '';
  selectedCategory: string = '';
  shareMenuVisible = false;
  shareMenuPosition = { top: 0, left: 0 };
  openShareSlug: string | null = null;
  lastMouseEvent!: MouseEvent;

  constructor(
    private publicationsService: PublicationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPublications();

    // Ocultar menú flotante al hacer clic fuera
    document.addEventListener('click', () => {
      this.shareMenuVisible = false;
    });
  }

  getPublications(): void {
    this.publicationsService.getPublicaciones().subscribe({
      next: (pubs) => {
        this.publications = pubs;
        this.filteredPublications = pubs;
      },
      error: (err) => console.error('❌ Error al obtener publicaciones:', err),
    });
  }

  filterPublications(): void {
    this.filteredPublications = this.publications.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(this.search.toLowerCase());
      const matchesCategory = this.selectedCategory ? p.typeOfOperation === this.selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }

  openEditModal(publication: Publication): void {
    this.router.navigate(['/edit-publicacion', publication.slug]);
  }

  deletePublication(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      this.publicationsService.deletePublication(id).subscribe({
        next: () => this.getPublications(),
        error: (err) => console.error('❌ Error al eliminar publicación:', err),
      });
    }
  }

  openShareMenu(event: MouseEvent, slug: string): void {
    event.stopPropagation();
    this.openShareSlug = slug;
    this.shareMenuVisible = true;

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    this.shareMenuPosition = {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    };
  }

  getShareUrl(slug: string): string {
    return `http://localhost:5070/share/${slug}`;
  }

  formatViews(views: number): string {
    if (views >= 1_000_000) return (views / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (views >= 1_000) return (views / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    return views.toString();
  }
}
