import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelo/Usuario';
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';
import { SessionService } from '../servicios/session.service';

@Component({
  selector: 'app-pinicio',
  templateUrl: './pinicio.component.html',
  styleUrls: ['./pinicio.component.scss']
})

export class PInicioComponent implements OnInit {


  usuario: Usuario = new Usuario(0, "", "", "", "", "", "", "", "", "");
  usuarios: Usuario[] = [];
  constructor(private ususer: UsuarioService, private router: Router,private sesSer: SessionService) {

  }

  public iniciar(): String {
    let destino: String = "";
    console.log("Login: "+this.usuario.login+" Password: "+this.usuario.password);
    this.ususer.iniciar(this.usuario.login, this.usuario.password).subscribe(
      usua => {   
        this.usuario =usua[0];
        destino = this.usuario.tipo;
        this.sesSer.setUser(this.usuario);
        this.navegar();
      }
    );
  
    return destino;
  }

  public navegar() {
    if (this.usuario.tipo === "Estudiante") {
      console.log('Navegando a la ruta de estudiante');
      this.irAEstudiante();
    }
    if (this.usuario.tipo === "Instructor") {
      console.log('Navegando a la ruta de instructor');
      this.irAInstructor();
    }
    if (this.usuario.tipo === "Coordinador") {
      this.irACoordinador();
      console.log('Navegando a la ruta de coordinador');
    }
    if (this.usuario.tipo === "Director") {
      this.irADirector();
      console.log("Navegando a la ruta de director");
    }
  }

  irAEstudiante() {
    this.router.navigate(['/guiEstudiante']);
    console.log("fui a la pagina del estudiante");

  }
  irACoordinador() {
    this.router.navigate(['/guiCoordinador']);
    console.log("fui a la pagina del coordinador");
  }
  irAInstructor() {
    this.router.navigate(['/guiInstructor']);
    console.log("fui a la pagina del Instructor");
  }
  irADirector(){
    this.router.navigate(['/guiDirector'])
    console.log("fui a la pagina del director");
  }

  ngOnInit(): void {
  
  }
}
