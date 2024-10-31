import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelo/Usuario';
import { SessionService } from '../servicios/session.service';


@Component({
  selector: 'app-guicoordinador',
  templateUrl: './guicoordinador.component.html',
  styleUrls: ['./guicoordinador.component.scss']
})

export class GUICoordinadorComponent implements OnInit {
  mostrarParea: boolean = false;
  mostrarPinstructor: boolean = false;
  mostrarPescenario: boolean = false;
  mostrarPdisciplina: boolean = false;
  mostrarPprograma: boolean = false;
  mostrarPtipoActividad: boolean = false;
  mostrarPactividad: boolean = true;
  public usuario: Usuario = new Usuario(0, "", "", "", "", "", "", "", "", "");

  constructor(private sesSer: SessionService) {

  }

  ngOnInit(): void {
    this.usuario=this.sesSer.getUser();
  }

  mostrarComponenteArea() {
    this.mostrarParea = true;
    this.mostrarPinstructor = false;
    this.mostrarPescenario = false;
    this.mostrarPdisciplina = false;
    this.mostrarPprograma = false;
    this.mostrarPtipoActividad = false;
    this.mostrarPactividad = false;
  }

  mostrarComponenteEscenario() {
    this.mostrarParea = false;
    this.mostrarPinstructor = false;
    this.mostrarPescenario = true;
    this.mostrarPdisciplina = false;
    this.mostrarPprograma = false;
    this.mostrarPtipoActividad = false;
    this.mostrarPactividad = false;
  }
  mostrarComponenteInstructor() {
    this.mostrarParea = false;
    this.mostrarPinstructor = true;
    this.mostrarPescenario = false;
    this.mostrarPdisciplina = false;
    this.mostrarPprograma = false;
    this.mostrarPtipoActividad = false;
    this.mostrarPactividad = false;
  }
  mostrarComponenteDisciplina() {
    this.mostrarParea = false;
    this.mostrarPinstructor = false;
    this.mostrarPescenario = false;
    this.mostrarPdisciplina = true;
    this.mostrarPprograma = false;
    this.mostrarPtipoActividad = false;
    this.mostrarPactividad = false;
  }

  mostrarComponentePrograma() {
    this.mostrarParea = false;
    this.mostrarPinstructor = false;
    this.mostrarPescenario = false;
    this.mostrarPdisciplina = false;
    this.mostrarPprograma = true;
    this.mostrarPtipoActividad = false;
    this.mostrarPactividad = false;
  }

  mostrarComponenteTipoActividad(){
    this.mostrarParea = false;
    this.mostrarPinstructor = false;
    this.mostrarPescenario = false;
    this.mostrarPdisciplina = false;
    this.mostrarPprograma = false;
    this.mostrarPtipoActividad = true;
    this.mostrarPactividad = false;
  }

  mostrarComponenteActividad(){
    this.mostrarParea = false;
    this.mostrarPinstructor = false;
    this.mostrarPescenario = false;
    this.mostrarPdisciplina = false;
    this.mostrarPprograma = false;
    this.mostrarPtipoActividad = false;
    this.mostrarPactividad = true;
  }
}
