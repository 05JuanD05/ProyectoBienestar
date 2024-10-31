import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelo/Usuario';
import { SessionService } from '../servicios/session.service';


@Component({
  selector: 'app-guidirector',
  templateUrl: './guidirector.component.html',
  styleUrls: ['./guidirector.component.scss']
})

export class GUIDirectorComponent implements OnInit{
  mostrarPeriodo: boolean = false;
  mostrarPrograma: boolean = false;
  mostrarCoordinador: boolean = false;
  mostrarArea: boolean = false;
  public usuario: Usuario = new Usuario(0, "", "", "", "", "", "", "", "", "");

  constructor(private sesSer: SessionService) {

  }

  ngOnInit(): void {
    this.usuario=this.sesSer.getUser();
  }

  mostrarComponentePeriodo() {
    this.mostrarPeriodo = true;
    this.mostrarPrograma = false;
    this.mostrarCoordinador = false;
    this.mostrarArea = false;
  }

  mostrarComponenteProgramas() {
    this.mostrarPeriodo = false;
    this.mostrarPrograma = true;
    this.mostrarCoordinador = false;
    this.mostrarArea = false;
  }

  mostrarComponenteCoordinador() {
    this.mostrarPeriodo = false;
    this.mostrarPrograma = false;
    this.mostrarCoordinador = true;
    this.mostrarArea = false;
  }

  mostrarComponenteArea() {
    this.mostrarPeriodo = false;
    this.mostrarPrograma = false;
    this.mostrarCoordinador = false;
    this.mostrarArea = true;
  }
}
