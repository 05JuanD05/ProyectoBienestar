import { Component, OnInit } from '@angular/core';
import { Disciplina } from 'src/app/modelo/Disciplina';
import { Instructor } from 'src/app/modelo/Instructor';
import { Usuario } from 'src/app/modelo/Usuario';
import { InstructorService } from 'src/app/servicios/instructor.service';
import { DisciplinaService } from 'src/app/servicios/disciplina.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditDisComponent } from '../editarDisciplina/edit-dis/edit-dis.component';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})

export class InstructorComponent implements OnInit {
  public usuario: Usuario = new Usuario(0, "", "", "", "", "", "", "", "", "", "");
  public instructor: Instructor = new Instructor("", new Disciplina(0, "", "",""), 0, new Usuario(0, "", "", "", "", "", "", "", "", "", ""));
  public usuarios: Usuario[] = [];
  public instructores: Instructor[] = [];
  public disciplinas: Disciplina[] = [];


  constructor(
    private discser:DisciplinaService,
    private instser: InstructorService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    this.listarDisciplinas();
    this.listarUsuarios();
    this.listarInstructores();
    this.usuario = new Usuario(0, "", "", "", "", "", "", "", "Instructor", "Activo", "");
    this.instructor = new Instructor("", new Disciplina(0, "", "",""), 0); // O el valor que corresponda
  }


  listarDisciplinas() {
    this.discser.obtenerDisciplinas().subscribe(
      (data) => {
        this.disciplinas = data;
        console.log(this.disciplinas);
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
                inst.disciplina.estado
              ),
              inst.id,
              inst.usuario
            )
        );
      },
      (error) => {
        console.error('Error al listar instructores:', error);
      }
    );
  }
  

  seleccionarDisciplina(disc: Disciplina) {
    this.instructor.disciplina = {
      ... disc, 
      id: +disc.id
    };
    console.log("Disciplina seleccionada:", this.instructor.disciplina);
  }

  

  crearInstructor(): void {
    this.instructor.especialidad = "Instructor";
    this.usuario.id = this.usuarios.length + 1;
    this.instructor.id = this.usuario.id;
    this.instructor.usuario = this.usuario;
    this.usuario.estado = "Activo";
    this.usuario.disciplina = this.instructor.disciplina.nombre;

    if (this.usuario.validar() && this.instructor.validar() && this.instructor.disciplina.id > 0) {
      this.instser.createUsuario(this.usuario).pipe(
        switchMap(() => this.instser.createInstructor(this.instructor))
      ).subscribe({
        next: () => {
          this.snackBar.open('Instructor agregado exitosamente!!', 'Cerrar');
          this.resetFormulario();
          this.listarUsuarios();
          this.listarInstructores();
        },
        error: (err) => {
          console.error('Error al agregar instructor: ', err);
          this.snackBar.open('Error al agregar al Instructor.', 'error');
        }
      });
      } else {
        this.snackBar.open('Debe completar todos los campos porfavor.', 'Cerrar', { duration: 3000});
        console.log("Debe digitar todos los datos");
      }
    }

    private resetFormulario(): void {
      this.instructor = new Instructor("", new Disciplina(0, "", "", ""), 0, new Usuario(0, "", "", "", "", "", "", "", "", "", ""));
      this.usuario = new Usuario(0, "", "", "", "", "", "", "", "", "", "");
    }

  abrirDialogoEditar(usuario: any): void {
    const dialogRef = this.dialog.open(EditDisComponent, {
      width: '400px',
      data: { instructor: { ...usuario } },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        Object.assign(usuario, result);
        console.log('Instructor actualizado:', usuario);
      }
    });
  }
  
     eliminarInstructor(id: number) {
       this.instser.eliminarUsuario(id).subscribe(
         (response) => {
           console.log('El instructor se elimino', response);
           this.listarUsuarios();
           this.snackBar.open('Instructor eliminado correctamente!!.', 'Cerrar', { duration: 3000});
           this.usuario = new Usuario(0, "", "", "", "", "", "", "", "", "", "");
         },
         (error) => {
           console.log('Error al eliminar al Instructor', error);
          this.snackBar.open('Error al eliminar al Instructor.', 'Cerrar', { duration: 3000});
         }
       )
     }
  }

