import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
    private readonly UPLOADS_FOLDER = 'uploads';
  
    uploadImage(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageName = `${new Date().getTime()}_${file.name}`;
          localStorage.setItem(`${this.UPLOADS_FOLDER}/${imageName}`, reader.result as string);
          resolve(imageName);
        };
        reader.readAsDataURL(file);
      });
    }
  
    getImageUrl(imageName: string): string | null {
      return localStorage.getItem(`${this.UPLOADS_FOLDER}/${imageName}`);
    }
}