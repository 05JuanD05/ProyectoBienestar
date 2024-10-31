import { Component } from '@angular/core';
import { Area } from 'src/app/modelo/Area';
import { AreaService } from 'src/app/servicios/area.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent {

  public area: Area = new Area(0, "");
  public areas: Area[] = this.areser.areas;



  constructor(private areser: AreaService) {

  }

  ngOnInit() {
    this.listarAreas();
  }

  listarAreas() {
    this.areser.obtenerAreas().subscribe(
      (data) => {
        this.areas = data;
      }
    );
  }

  crearArea(): void {
    this.area.id = this.areser.areas.length;
    this.areser.createArea(this.area).subscribe(
      (response) => {
        console.log('Area agregada:', response);
        this.listarAreas();
        this.area = new Area(0, "");
      });
    
  }

  eliminarArea(id: number) {
    this.areser.eliminarArea(id).subscribe(
      (response) => {
        console.log('El Area se eliminó con éxito:', response);
        this.listarAreas();
        this.area = new Area(0, "");
      }
    );
  }


  consultarArea(id: number){
    this.areser.consultarArea(id).subscribe(
      (data) => {
        this.area = data;
      }
    );
  }

  actualizarArea(id: number, datosActualizados: any) {
    this.areser.actualizarArea(id, datosActualizados).subscribe(
      (response) => {
        console.log('Area actualizada:', response);
        this.listarAreas();
        this.area = new Area(0, "");
        // Puedes realizar acciones adicionales después de la actualización
      }
    );
  }


}
