import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Escenario } from 'src/app/modelo/Escenario';
import { EscenarioService } from 'src/app/servicios/escenario.service';

@Component({
  selector: 'app-escenario',
  templateUrl: './escenario.component.html',
  styleUrls: ['./escenario.component.scss']
})
export class EscenarioComponent implements OnInit {

  public escenario: Escenario = new Escenario("0", "", "", "", "", "", "");
  public escenarios: Escenario[] = [];
  public previsualizacion: string;
  private imagenSeleccionada: File | null = null;
  estadoEscenario: boolean = false;

  constructor(private escenar: EscenarioService, private sanitizer: DomSanitizer) {
    this.previsualizacion = '';
  }

  imagenPrevia: any;
  files: any = [];

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
        this.escenarios = data.map((escenario: any) => ({
          ...escenario,
          id: String(escenario.id)  // Convertir el id a string si necesario
        }));
      }
    );
  }

  onFileSelected(event: any): void {
    this.imagenSeleccionada = event.target.files[0] as File;
    this.base64(this.imagenSeleccionada).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);
    });
  }

  crearEscenario(): void {
    this.escenario.id = String(this.escenario.id); // Aseguramos que sea string
    this.escenar.createEscenario(this.escenario).subscribe(
      (response) => {
        console.log('Escenario agregado:', response);
        this.listarEscenarios();
        this.escenario = new Escenario("0", "", "", "", "", "", ""); // Limpiar el formulario
      }
    );
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
        reject(e);
      }
    });
  };

  eliminarEscenario(id: string) {
    const idAsNumber = Number(id); // Convertir el ID a número
    if (!isNaN(idAsNumber)) { // Verificar que el ID convertido sea válido
      this.escenar.eliminarEscenario(idAsNumber).subscribe(
        (response) => {
          console.log('El escenario se eliminó:', response);
          this.listarEscenarios();
          this.escenario = new Escenario("0", "", "", "", "", "", ""); // Limpiar el formulario
        }
      );
    } else {
      console.error('ID inválido para eliminación:', id);
    }
  }
  

  consultarEscenario(id: string) {
    const idAsNumber = Number(id); // Convertir el ID a número
    if (!isNaN(idAsNumber)) { // Validar que la conversión sea correcta
      this.escenar.consultarEscenario(idAsNumber).subscribe(
        (data) => {
          this.escenario = data; // Asignar los datos al modelo
        },
        (error) => {
          console.error('Error al consultar el escenario:', error);
        }
      );
    } else {
      console.error('ID inválido para consulta:', id);
    }
  }
  

  actualizarEscenario() {
    const idAsNumber = Number(this.escenario.id); // Convertir el ID a número
    if (!isNaN(idAsNumber)) {
      this.escenar.actualizarEscenario(idAsNumber, this.escenario).subscribe(
        (response) => {
          console.log('Escenario actualizado:', response);
          this.listarEscenarios();
          this.escenario = new Escenario("0", "", "", "", "", "", ""); // Limpiar el formulario
        }
      );
    } else {
      console.error('ID inválido para actualización:', this.escenario.id);
    }
  }
}
