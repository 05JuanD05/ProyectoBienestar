import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ResolveEnd } from '@angular/router';
import { Escenario } from 'src/app/modelo/Escenario';
import { EscenarioService } from 'src/app/servicios/escenario.service';
import { FileSaverService } from 'ngx-filesaver';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-escenario',
  templateUrl: './escenario.component.html',
  styleUrls: ['./escenario.component.scss']
})
export class EscenarioComponent implements OnInit {

  public escenario: Escenario = new Escenario(0, "", "", "", "", "","");
  public escenarios: Escenario[] = this.escenar.escenarios;

  public previsualizacion: string;
  
  private imagenSeleccionada: File | null = null;

  estadoEscenario: boolean = false;

  constructor(private escenar: EscenarioService, private sanitizer: DomSanitizer, private fileSaverService: FileSaverService) {
    this.previsualizacion = '';
  }

  imagenPrevia: any;
  files: any = []

  ngOnInit(): void {
    this.listarEscenarios();
  }

  cambioEstado(event: Event) {
    const id = (event.target as HTMLElement).id;
    
    const boton = document.getElementById('esta2') as HTMLButtonElement;
    const boton2 = document.getElementById('add') as HTMLButtonElement;

    if (id === 'esta') {
      boton2.disabled = true;
      boton.disabled = false;
    } else if (id === 'esta2') {
      boton2.disabled = false;
      boton.disabled = true;
    }
  }
 


  listarEscenarios() {
    this.escenar.obtenerEscenarios().subscribe(
      (data) => {
        this.escenarios = data;
      }
    );
  }

  onFileSelected(event:any): void {
    this.imagenSeleccionada = event.target.files[0] as File;
    this.base64(this.imagenSeleccionada).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);
    });
  }

  crearEscenario(): void{
    this.escenario.id = this.escenar.escenarios.length;
    this.escenar.createEscenario(this.escenario).subscribe(
      (response) => {
      console.log('Escenario agregado:', response);
      this.listarEscenarios();
      this.escenario = new Escenario(0, "", "", "", "", "", "");
    });
  }

  base64 = async ($event: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = () => {
          const unsafeImg = window.URL.createObjectURL($event);
          const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
          resolve({
            blob: $event,
            image,
            base: reader.result
          });
        };
        reader.onerror = error => {
          const unsafeImg = window.URL.createObjectURL($event);
          const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
          resolve({
            blob: $event,
            image,
            base: null
          });
        };
        reader.readAsDataURL($event);
      } catch (e) {
        reject(e); // Rechaza la promesa en caso de error
      }
    });
  };
  
  eliminarEscenario(id: number) {
    this.escenar.eliminarEscenario(id).subscribe(
      (response) => {
        console.log('El escenario se elimino', response);
        this.listarEscenarios();
        this.escenario = new Escenario(0, "", "", "", "", "", "");
      }
    );
  }

  consultarEscenario(id: number) {
    this.escenar.consultarEscenario(id).subscribe(
      (data) => {
        this.escenario = data;
      }
    );
  }

  actualizarEscenario(id: number, datosActualizados: any) {
    this.escenar.actualizarEscenario(id, datosActualizados).subscribe(
      (response) => {
        console.log('Escenario actualizado', response);
        this.listarEscenarios();
        this.escenario = new Escenario(0, "", "", "", "", "", "");
      }
    );
  }
}
