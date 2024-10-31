import { Component } from '@angular/core';
import { ImageService } from 'src/app/servicios/image.service';

@Component({
  selector: 'app-image-uploader',
  template: `
    <input type="file" (change)="onFileSelected($event)">
  `
})
export class ImageUploaderComponent {
  constructor(private imageService: ImageService) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.imageService.uploadImage(file)
        .then(imageName => {
          console.log('Imagen subida:', imageName);
        })
        .catch(error => {
          console.error('Error al subir la imagen:', error);
        });
    }
  }
}
