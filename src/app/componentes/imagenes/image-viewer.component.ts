import { Component, Input } from '@angular/core';
import { ImageService } from 'src/app/servicios/image.service';

@Component({
  selector: 'app-image-viewer',
  template: `
    <img *ngIf="imageName" [src]="getImageUrl(imageName)" alt="Imagen">
    `
})
export class ImageViewerComponent {
  @Input() imageName: string | null = null;

  constructor(private imageService: ImageService) {}

  getImageUrl(imageName: string): string | null {
    return this.imageService.getImageUrl(imageName);
  }
}
