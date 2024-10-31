import { Component, OnInit } from '@angular/core';
import { Instructor } from '../modelo/Instructor';
import { Usuario } from '../modelo/Usuario';
import { SessionService } from '../servicios/session.service';
import { Actividad } from '../modelo/Actividad';
import { ActividadService } from '../servicios/actividad.service';

@Component({
  selector: 'app-guiinstructor',
  templateUrl: './guiinstructor.component.html',
  styleUrls: ['./guiinstructor.component.scss'],
})
export class GUIInstructorComponent implements OnInit {
  mostrarCronogramaActividadInstructor: boolean = true;
  mostrarListarInscripcion: boolean = false;
  public usuario: Usuario = new Usuario(0, "", "", "", "", "", "", "", "", "");

  public actividades: Actividad[] = this.acti.actividades;
  constructor(private sesSer: SessionService,private acti: ActividadService) {

  }
  ngOnInit(): void {
    this.listarActividades();
    this.usuario=this.sesSer.getUser();    
  }

  _mostrarListarInscripcion() {
    this.mostrarCronogramaActividadInstructor = false;
    this.mostrarListarInscripcion = true;
  }

  _mostrarmostrarCronogramaActividadInstructor() {
    this.mostrarCronogramaActividadInstructor = true;
    this.mostrarListarInscripcion = false;
  }

  listarActividades() {
    this.acti.obtenerActividades().subscribe(
      (data) => {
        this.actividades = data;
      }
    )
  }

}
