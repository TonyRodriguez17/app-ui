import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  @Output() imagesData = new EventEmitter<File[]>();
  @Output() previewData = new EventEmitter<string[]>();

  images: File[] = [];
  previews: string[] = [];
  currentPage = 0;
  imagesPerPage = 4;

  onFileSelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.processFiles(files);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      const files = Array.from(event.dataTransfer.files) as File[];

      const imageFiles = files.filter(file => file.type.startsWith('image/'));
      if (imageFiles.length !== files.length) {
        alert("Algunos archivos no son imágenes y fueron descartados.");
      }

      this.processFiles(files);
    }
  }

  processFiles(files: File[]) {
    let loadedImages = 0;
    const newPreviews: string[] = [];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    files.forEach((file, index) => {
      if (!allowedTypes.includes(file.type)) {
        alert(`El archivo "${file.name}" no es una imagen válida.`);
        return;
      }

      if (!this.images.some(img => img.name === file.name)) {
        this.images.push(file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          newPreviews[index] = e.target.result;
          loadedImages++;

          if (loadedImages === files.length) {
            this.previews.push(...newPreviews);
            this.previewData.emit([...this.previews]);
            this.imagesData.emit([...this.images]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  removeImage(index: number) {
    const globalIndex = this.currentPage * this.imagesPerPage + index;
    this.images.splice(globalIndex, 1);
    this.previews.splice(globalIndex, 1);

    this.imagesData.emit(this.images);
    this.previewData.emit(this.previews);

    if (this.getPaginatedImages().length === 0 && this.currentPage > 0) {
      this.currentPage--;
    }
  }

  // Obtener imágenes paginadas
  getPaginatedImages() {
    const start = this.currentPage * this.imagesPerPage;
    return this.images.slice(start, start + this.imagesPerPage);
  }

  getPaginatedPreviews() {
    const start = this.currentPage * this.imagesPerPage;
    return this.previews.slice(start, start + this.imagesPerPage);
  }

  // Cambiar de página
  nextPage() {
    if ((this.currentPage + 1) * this.imagesPerPage < this.images.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  // Evitar comportamiento por defecto en Drag & Drop
  preventDefaults(event: Event) {
    event.preventDefault();
  }
}
