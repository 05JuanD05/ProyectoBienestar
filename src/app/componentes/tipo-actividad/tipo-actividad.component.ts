import { Component } from '@angular/core';
import { TipoActividad } from 'src/app/modelo/TipoActividad';
import { TipoActividadService } from 'src/app/servicios/tipo-actividad.service';

@Component({
  selector: 'app-tipo-actividad',
  templateUrl: './tipo-actividad.component.html',
  styleUrls: ['./tipo-actividad.component.scss']
})
export class TipoActividadComponent {

  public tipo: TipoActividad = new TipoActividad(0, "", "", "");
  public tipos: TipoActividad[] = [];
  public submitted: boolean = false;
  public nextId: number = 1;  // Aseguramos que el contador comience desde 1

  constructor(private tipaser: TipoActividadService) {}

  ngOnInit() {
    this.listarTiposActividad();
  }

  listarTiposActividad() {
    this.tipaser.obtenerTiposActividades().subscribe(
      (data) => {
        this.tipos = data; // Los IDs deben venir generados del backend
        this.nextId = this.getNextId(data);  // Calculamos el siguiente ID
      },
      (error) => console.error('Error al listar tipos de actividades:', error)
    );
  }

  // Método para obtener el siguiente ID
  private getNextId(data: TipoActividad[]): number {
    if (data.length > 0) {
      // Si ya hay elementos, el siguiente ID será uno más que el mayor ID actual
      return Math.max(...data.map(a => a.id)) + 1;
    }
    return 1;  // Si no hay datos, comenzamos desde 1
  }

  crearTiposActividad(): void {
    this.submitted = true;

    if (!this.tipo.titulo || !this.tipo.objetivo || !this.tipo.descripcion) {
      alert("Por favor, llena todos los campos antes de agregar.");
      return;
    }

    // Asignar el siguiente ID al tipo antes de enviarlo al backend
    this.tipo.id = this.nextId;

    this.tipaser.createTipoActividad(this.tipo).subscribe(
      (response) => {
        console.log('TipoActividad agregada:', response);
        this.listarTiposActividad();  // Refrescar la lista
        this.tipo = new TipoActividad(0, "", "", "");  // Resetear el formulario
        this.submitted = false;
      },
      (error) => console.error('Error al agregar tipo de actividad:', error)
    );
  }

  eliminarTiposActividad(id: number) {
    if (!id) {
      console.error('ID no válido');
      return;
    }
    
    this.tipaser.eliminarATipoActividad((id)).subscribe({
      next: () => {
        console.log('TipoActividad eliminada con éxito');
        this.listarTiposActividad();  // Refrescar la lista
      },
      error: (error) => {
        if (error.status === 404) {
          console.error('La actividad no existe o ya fue eliminada');
        } else {
          console.error('Error al eliminar la actividad:', error);
        }
      }
    })
  }

  consultarTiposActividad(id: number) {
    this.tipaser.consultarTipoActividad(id).subscribe(
      (data) => {
        this.tipo = { ...data };
      },
      (error) => console.error('Error al consultar tipo de actividad:', error)
    );
  }

  actualizarTiposActividad(id: number, datosActualizados: any) {
    if (confirm('¿Estás seguro de que deseas editar esta actividad?')) {
      this.submitted = true;
      if (!this.tipo.titulo || !this.tipo.objetivo || !this.tipo.descripcion) {
        alert("Por favor, llena todos los campos antes de actualizar.");
        return;
      }

      this.tipaser.actualizarTipoActividad(id, datosActualizados).subscribe(
        (response) => {
          console.log('TipoActividad actualizada:', response);
          this.listarTiposActividad();  // Actualizar la lista
          this.tipo = new TipoActividad(0, "", "", "");  // Resetear formulario
          this.submitted = false;
        },
        (error) => console.error('Error al actualizar tipo de actividad:', error)
      );
    }
  }
}