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
        this.instructores = data.map(
          (inst) =>
            new Instructor(
              inst.especialidad,
              new Disciplina(
                inst.disciplina.id,
                inst.disciplina.nombre,
                inst.disciplina.descripcion,
                inst.disciplina.categoria
              ),
              inst.id
            )
        );
      },
      (error) => {
        console.error('Error al listar instructores:', error);
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

  editarInstructor(instructorData: any) {
    if (!instructorData) {
      console.error("No se recibieron datos del instructor.");
      return;
    }
  
    // Crear una copia profunda de disciplina
    const disciplina = instructorData.disciplina
      ? new Disciplina(
          instructorData.disciplina.id || 0,
          instructorData.disciplina.nombre || "",
          instructorData.disciplina.descripcion || "",
          instructorData.disciplina.categoria || ""
        )
      : new Disciplina(0, "", "", "");
  
    // Crear una copia del instructor
    this.instructor = new Instructor(
      instructorData.especialidad || "",
      disciplina,
      instructorData.id || 0
    );
  
    // Crear una copia del usuario
    this.usuario = new Usuario(
      instructorData.id || 0,
      instructorData.nombre || "",
      instructorData.apellido || "",
      instructorData.email || "",
      instructorData.tipo || "",
      instructorData.estado || "",
      instructorData.telefono || "",
      instructorData.login || "",
      instructorData.password || "",
      instructorData.identificacion || ""
    );
  
    // Habilitar el botón "Editar"
    const editarBtn = document.getElementById("esta2") as HTMLButtonElement;
    if (editarBtn) editarBtn.disabled = false;
  
    console.log("Datos cargados para edición:", this.usuario, this.instructor);
  }
  
  guardarCambios() {
    if (this.validarDatos()) { // Valida los datos antes de intentar guardar
      this.instser.actualizarInstructor(this.instructor).subscribe(
        (respuesta) => {
          console.log("Instructor actualizado correctamente:", respuesta);
          this.snackBar.open('Instructor actualizado correctamente!', 'Cerrar', {
            duration: 3000,
            panelClass: ['snack-success'], // Clase CSS personalizada opcional
          });
          this.listarInstructores(); // Refresca la lista después de guardar
        },
        (error) => {
          console.error("Error al actualizar el instructor:", error);
          this.snackBar.open('Error al actualizar el instructor.', 'Cerrar', {
            duration: 3000,
            panelClass: ['snack-error'], // Clase CSS personalizada opcional
          });
        }
      );
    } else {
      console.log("Debe completar todos los datos.");
      this.snackBar.open('Debe completar todos los datos.', 'Cerrar', {
        duration: 3000,
        panelClass: ['snack-warning'], // Clase CSS personalizada opcional
      });
    }
  }
  
  validarDatos(): boolean {
    if (!this.instructor || !this.usuario) return false;
  
    // Valida campos obligatorios del instructor
    if (!this.instructor.especialidad.trim() || !this.instructor.disciplina) return false;
  
    // Valida campos obligatorios del usuario
    if (
      !this.usuario.nombre.trim() ||
      !this.usuario.apellido.trim() ||
      !this.usuario.email.trim() ||
      !this.usuario.identificacion.trim()
    ) {
      return false;
    }
  
    return true; // Todos los datos son válidos
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
