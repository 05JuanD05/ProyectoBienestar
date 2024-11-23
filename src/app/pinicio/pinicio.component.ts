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

export class PInicioComponent implements OnInit { usuario: Usuario = new Usuario(0, "", "", "", "", "", "", "", "", "", "");
  usuarios: Usuario[] = [];
  passwordFieldType: string = 'password';
  passwordIcon: string = 'fas fa-eye';

  constructor(private ususer: UsuarioService, private router: Router, private sesSer: SessionService) { }

  public iniciar(): void {
    if (!this.usuario.login || !this.usuario.password) {
      alert('Por favor, llene las credenciales antes de iniciar sesión.');
      return;
    }
  this.ususer.iniciar(this.usuario.login, this.usuario.password).subscribe(
      usua => {   
        if (usua && usua.length > 0) {
          this.usuario = usua[0];
          this.sesSer.setUser(this.usuario);
          this.navegar();
        } else {
          alert('Credenciales incorrectas. Intente de nuevo.');
        }
      },
      error => {
        console.error("Error en el inicio de sesión", error);
        alert('Error al iniciar sesión. Por favor, inténtelo más tarde.');
      }
    ); }

  public navegar() {
    switch (this.usuario.tipo) {
      case 'Estudiante':
        this.irAEstudiante();
        break;
      case 'Instructor':
        this.irAInstructor();
        break;
      case 'Coordinador':
        this.irACoordinador();
        break;
      case 'Director':
        this.irADirector();
        break;
      default:
        console.log("Tipo de usuario no reconocido");
    }
  }

  irAEstudiante() {
    this.router.navigate(['/guiEstudiante']); }
irACoordinador() {
    this.router.navigate(['/guiCoordinador']); }

  irAInstructor() {
    this.router.navigate(['/guiInstructor']); }

  irADirector() {
    this.router.navigate(['/guiDirector']);
  }
  togglePasswordVisibility() {    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
      this.passwordIcon = 'fas fa-eye-slash';
    } else {
      this.passwordFieldType = 'password';
      this.passwordIcon = 'fas fa-eye';
    }
  }

  ngOnInit(): void { }
}
