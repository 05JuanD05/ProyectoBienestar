import { Component } from '@angular/core';
import { Actividad } from 'src/app/modelo/Actividad';
import { TipoActividad } from 'src/app/modelo/TipoActividad';
import { ActividadService } from 'src/app/servicios/actividad.service';
import { TipoActividadService } from 'src/app/servicios/tipo-actividad.service';

@Component({
  selector: 'app-tipo-actividad',
  templateUrl: './tipo-actividad.component.html',
  styleUrls: ['./tipo-actividad.component.scss']
})
export class TipoActividadComponent {

  public tipo: TipoActividad = new TipoActividad(0, "", "", "");
  public tipos: TipoActividad[] = this.tipaser.tipos;

  constructor(private tipaser: TipoActividadService, private acti: ActividadService) {

  }

  ngOnInit() {
    this.listarTiposActividad();
  }

  listarTiposActividad() {
    this.tipaser.obtenerTiposActividades().subscribe(
      (data) => {
        this.tipos = data;
      }
    );
  }

  crearTiposActividad(): void {
    this.tipo.id = this.tipaser.tipos.length;
    this.tipaser.createTipoActividad(this.tipo).subscribe(
      (response) => {
        console.log('TipoActividad agregada:', response);
        this.listarTiposActividad();
        this.tipo = new TipoActividad(0, "", "", "");
      });

  }

  eliminarTiposActividad(id: number) {
    this.tipaser.eliminarATipoActividad(id).subscribe(
      (response) => {
        console.log('El TipoActividad se eliminó con éxito:', response);
        this.listarTiposActividad();
        this.tipo = new TipoActividad(0, "", "", "");
      }
    );
  }


  consultarTiposActividad(id: number) {
    this.tipaser.consultarTipoActividad(id).subscribe(
      (data) => {
        this.tipo = data;
      }
    );
  }

  actualizarTiposActividad(id: number, datosActualizados: any) {
    this.tipaser.actualizarTipoActividad(id, datosActualizados).subscribe(
      (response) => {
        console.log('TipoActividad actualizada:', response);
        this.listarTiposActividad();
        this.tipo = new TipoActividad(0, "", "", "");
        // Puedes realizar acciones adicionales después de la actualización
      }
    );
  }


}