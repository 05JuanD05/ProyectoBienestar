import { Component, OnInit } from '@angular/core';
import { Disciplina } from 'src/app/modelo/Disciplina';
import { Instructor } from 'src/app/modelo/Instructor';
import { Usuario } from 'src/app/modelo/Usuario';
import { InstructorService } from 'src/app/servicios/instructor.service';
import { InformadorComponent } from 'src/app/utilidades/informador/informador.component';
import { DisciplinaService } from 'src/app/servicios/disciplina.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})

export class InstructorComponent implements OnInit {
  public instructor: Instructor = new Instructor("", new Disciplina(0, "", "",""), 0);
  public instructores: Instructor[] = [];
  public usuarios: Usuario[] = [];
  public disciplinas: Disciplina[] = [];
  public usuario: Usuario = new Usuario(0, "", "", "", "", "", "", "", "", "");


  constructor(private discser:DisciplinaService, private instser: InstructorService, private infcom: InformadorComponent, private readonly snackBar: MatSnackBar) {}

  ngOnInit() {
    this.listarDisciplinas();
    this.listarUsuarios();
    this.listarInstructores()
  }


  listarDisciplinas() {
    this.discser.obtenerDisciplinas().subscribe(
      (data) => {
        this.disciplinas = data;
      }
    );    
  }

  
  listarUsuarios() {
    this.instser.obtenerUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      }
    );
  }

  listarInstructores() {
    this.instser.obtenerInstructores().subscribe(
      (data) => {
        this.instructores = data;
      }
    );
  }

  seleccionarDisciplina(disc: Disciplina) {
    this.instructor.disciplina = disc;
  }

  crearInstructor(): void {
    this.usuario.id = this.usuarios.length + 1;
    this.instructor.id = this.usuario.id;
    this.usuario.tipo = "Instructor";
    this.usuario.estado = "Activo";
    if (this.instructor.disciplina.id > 0) {
      if (this.usuario.validar() && this.instructor.validar()) {
        this.instser.createUsuario(this.usuario).subscribe(
          (resp) => {
            console.log('Usuario Agregado', resp);
            this.snackBar.open('Instructor agregado exitosamente!!', 'Cerrar', { duration: 3000});
          },
          (error) => {
            console.log('El usuario no se pudo registrar', error);
            this.snackBar.open('Error al agregar al Instructor.', 'Cerrar', { duration: 3000});
          }
        );
        this.instser.createInstructor(this.instructor).subscribe(
          (response) => {
            console.log('Instructor agregado:', response);
            this.instructor = new Instructor("", new Disciplina(0, "", "", ""), 0);
            this.snackBar.open('Instructor agregado.', 'Cerrar', { duration: 3000});
            this.listarUsuarios();
          });
      } else {
        this.snackBar.open('Debe completar todos los campos porfavor.', 'Cerrar', { duration: 3000});
        console.log("Debe digitar todos los datos");
      }
    } else {
      this.snackBar.open('Debe agregar una disciplina.', 'Cerrar', { duration: 3000});
      console.log("Debe agregar la disciplina");
    }
  }

  editarInstructor(instructor: Instructor) {
    this.usuario.id = instructor.id;
    this.usuario.tipo = "Instructor";
    this.usuario.estado = instructor.especialidad;
  }

  guardarCambios() {
    if (this.usuario.validar() && this.instructor.validar()) {
      this.instser.actualizarUsuario(this.usuario).subscribe(
        (resp) => {
          console.log('Instructor actualizado', resp);
          this.snackBar.open('Instructor actualizado correctamente!', 'Cerrar', { duration: 3000});
        },
        (error) => {
          console.log('Error al actualizar el Instructor', error);
          this.snackBar.open('Error al actualizar correctamente!', 'Cerrar', { duration: 3000});
        }
      );

      this.instser.actualizarInstructor(this.instructor).subscribe(
      (response) => {
        console.log('Instructor actualizado:', response);
        this.snackBar.open('Instructor actualizado correctamente!', 'Cerrar', { duration: 3000 });
        this.listarInstructores();  // Actualiza la lista después de editar
      },
      (error) => {
        console.log('Error al actualizar instructor', error);
        this.snackBar.open('Error al actualizar el instructor.', 'Cerrar', { duration: 3000 });
      }
    );
  } else {
    console.log("Debe digitar todos los datos");
    this.snackBar.open('Debe completar todos los datos.', 'Cerrar', { duration: 3000 });
  }
}
  
  eliminarInstructor(id: number) {
    this.instser.eliminarUsuario(id).subscribe(
      (response) => {
        console.log('El instructor se elimino', response);
        this.listarUsuarios();
        this.snackBar.open('Instructor eliminado correctamente!!.', 'Cerrar', { duration: 3000});
        this.usuario = new Usuario(0, "", "", "", "", "", "", "", "", "");
      },
      (error) => {
        console.log('Error al eliminar al Instructor', error);
        this.snackBar.open('Error al eliminar al Instructor.', 'Cerrar', { duration: 3000});
      }
    )
  }
}
