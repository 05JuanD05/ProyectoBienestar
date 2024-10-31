import { Component } from '@angular/core';
import { Usuario } from '../modelo/Usuario';
import { SessionService } from '../servicios/session.service';

@Component({
  selector: 'app-guiestudiante',
  templateUrl: './guiestudiante.component.html',
  styleUrls: ['./guiestudiante.component.scss']
})
export class GUIEstudianteComponent {

  mostrarPhorarioDeportivo: boolean = false;
  mostrarPhorarioCultural: boolean = false;
  mostrarPhorarioIdeportiva: boolean = false;
  mostrarPmiHorario: boolean = true;
  public usuario: Usuario = new Usuario(0, "", "", "", "", "", "", "", "", "");
  
  constructor(private sesSer: SessionService) {
  }

  ngOnInit(): void {
    this.usuario=this.sesSer.getUser();
  }

  mostrarComponenteDeportivo() {
    this.mostrarPhorarioDeportivo = true;
    this.mostrarPhorarioCultural = false;
    this.mostrarPhorarioIdeportiva = false;
    this.mostrarPmiHorario = false;
  }
  
  mostrarComponenteCultural() {
    this.mostrarPhorarioDeportivo = false;
    this.mostrarPhorarioCultural = true;
    this.mostrarPhorarioIdeportiva = false;
    this.mostrarPmiHorario = false;
  }

  mostrarComponenteIdeportivo() {
    this.mostrarPhorarioDeportivo = false;
    this.mostrarPhorarioCultural = false;
    this.mostrarPhorarioIdeportiva = true;
    this.mostrarPmiHorario = false;
  }

  mostrarComponenteMiHorario() {
    this.mostrarPhorarioDeportivo = false;
    this.mostrarPhorarioCultural = false;
    this.mostrarPhorarioIdeportiva = false;
    this.mostrarPmiHorario = true;
  }
}
