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
  @Output() imagesData = new EventEmitter<File[]>(); // Emitir archivos al padre
  @Output() previewData = new EventEmitter<string[]>(); // 🚀 Emitir Base64 al padre

  images: File[] = []; // Almacenar imágenes seleccionadas
  previews: string[] = []; // Almacenar vistas previas en Base64
  currentPage = 0; // Página actual de la galería
  imagesPerPage = 4; // Imágenes por página

  // Manejar archivos seleccionados desde el input
  onFileSelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.processFiles(files);
  }

  // Manejar archivos soltados en el área de Drop
  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      const files = Array.from(event.dataTransfer.files) as File[];
      this.processFiles(files);
    }
  }

  // Procesar archivos y generar previsualización
  processFiles(files: File[]) {
    let loadedImages = 0; 
    const newPreviews: string[] = []; 
    
    files.forEach((file, index) => {
      if (!this.images.some(img => img.name === file.name)) { 
        this.images.push(file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          newPreviews[index] = e.target.result; 
          loadedImages++; 
  
          if (loadedImages === files.length) { 
            this.previews.push(...newPreviews); 
            // 🚀 Emit previews first to ensure StrapperComponent has updated URLs
            this.previewData.emit([...this.previews]); 
            
            // 🚀 Emit files after previews are ready
            this.imagesData.emit([...this.images]); 
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }
  

  // Eliminar imagen de la lista
  removeImage(index: number) {
    const globalIndex = this.currentPage * this.imagesPerPage + index;
    this.images.splice(globalIndex, 1);
    this.previews.splice(globalIndex, 1);

    this.imagesData.emit(this.images);
    this.previewData.emit(this.previews); // 🚀 Emitir cambios en las previews

    // Si eliminamos la última imagen de una página, retrocedemos una página si es necesario
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
