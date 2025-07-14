import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Publication } from '../../models/publication.model';

@Component({
  selector: 'app-publication-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publication-card.component.html',
  styleUrl: './publication-card.component.css'
})
export class PublicationCardComponent {
  @Input() publication!: Publication;
  @Output() onEdit = new EventEmitter<Publication>();
  @Output() onDelete = new EventEmitter<number>();
  @Output() onShare = new EventEmitter<MouseEvent>();
  @Output() onShareSlug = new EventEmitter<string>();

  handleShare(event: MouseEvent) {
    this.onShare.emit(event);
    this.onShareSlug.emit(this.publication.slug);
  }
}
