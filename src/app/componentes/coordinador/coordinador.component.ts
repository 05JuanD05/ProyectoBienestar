import { Component } from '@angular/core';
import { Area } from 'src/app/modelo/Area';
import { Coordinador } from 'src/app/modelo/Coordinador';
import { Usuario } from 'src/app/modelo/Usuario';
import { CoordinadorService } from 'src/app/servicios/coordinador.service';

@Component({
  selector: 'app-coordinador',
  templateUrl: './coordinador.component.html',
  styleUrls: ['./coordinador.component.scss']
})

export class CoordinadorComponent {
  public coordinador: Coordinador = new Coordinador(0, "", "", "", "", "", "", "", "", "");
  public coordinadores: Coordinador[] = this.coorser.coordiandores;
  public usuarios: Usuario[] = [];

  constructor(private coorser: CoordinadorService) {

  }

  listarCoordinadores() {
    this.coorser.obtenerCoordinadores().subscribe(
      (data) => {
        this.coordinadores = data;
      }
    );
  }


  listarUsuarios() {
    this.coorser.obtenerUsuarios().subscribe(
      (data) => {
        this.usuarios = data;

      }
    );
  }

  ngOnInit() {
    this.listarUsuarios();
  }

  crearCoordinador(): void {
    this.listarUsuarios();
    this.coordinador.id = this.usuarios.length + 1;
    // console.log('Usuarios',this.coordinador.id);

    this.coordinador.tipo = "Coordinador";
    this.coordinador.area = new Area(1, "");
    this.coorser.createUsuario(this.coordinador).subscribe(
      (resp) => {
        console.log('Usuario Agregado', resp);
      }
    );
    this.coorser.createCoordinador(this.coordinador).subscribe(
      (response) => {
        console.log('Coordinador agregado:', response);
        this.listarCoordinadores();
        this.coordinador = new Coordinador(0, "", "", "", "", "", "", "", "", "");
      });
  }

}
