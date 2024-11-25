import { Component, OnInit } from '@angular/core';
import { Disciplina } from 'src/app/modelo/Disciplina';
import { Instructor } from 'src/app/modelo/Instructor';
import { InstructorService } from 'src/app/servicios/instructor.service';
import { DisciplinaService } from 'src/app/servicios/disciplina.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditDisComponent } from '../editarDisciplina/edit-dis/edit-dis.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss'],
})
export class InstructorComponent implements OnInit {
  public instructor: Instructor = new Instructor(0, "", "", "", "", "", "", "", new Disciplina(0, "", "", ""), "", "");
  public instructores: Instructor[] = [];
  public disciplinas: Disciplina[] = [];

  constructor(
    private discser: DisciplinaService,
    private instser: InstructorService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    this.listarDisciplinas();
    this.listarInstructores();
    this.resetFormulario();
  }

  listarDisciplinas() {
    this.discser.obtenerDisciplinas().subscribe((data) => {
      this.disciplinas = data;
      console.log(this.disciplinas);
    });
  }

  listarInstructores() {
    this.instser.obtenerInstructores().subscribe((data) => {
      this.instructores = data;
    });
  }

  seleccionarDisciplina(disc: Disciplina) {
    this.instructor.disciplina = {
      ...disc,
      id: +disc.id,
    };
    console.log('Disciplina seleccionada:', this.instructor.disciplina);
  }

  crearInstructor(): void {
    this.instructor.tipoI = "Instructor";
    this.instructor.estadoProfe = "Activo";

    if (this.instructor.validar()) {
      this.instser.createInstructor(this.instructor).subscribe({
        next: () => {
          this.snackBar.open('Instructor agregado exitosamente!!', 'Cerrar', { duration: 3000 });
          this.resetFormulario();
          this.listarInstructores();
          console.log('Total de Instructores Creados', this.crearInstructor);
        },
        error: (err) => {
          console.error('Error al agregar instructor: ', err);
          this.snackBar.open('Error al agregar al Instructor.', 'Cerrar', { duration: 3000 });
        },
      });
    } else {
      this.snackBar.open('Debe completar todos los campos por favor.', 'Cerrar', { duration: 3000 });
      console.log('Debe digitar todos los datos');
    }
  }

  private resetFormulario(): void {
    this.instructor = new Instructor(0, "", "", "", "", "", "", "", new Disciplina(0, "", "", ""), "", ""
    );
  }

  abrirDialogoEditar(instructor: any): void {
    if (!instructor.especialidad) {
      instructor.especialidad = 'Instructor'; // Valor predeterminado
    }
    const dialogRef = this.dialog.open(EditDisComponent, {
      width: '400px',
      data: { instructor: { ...instructor } },
    });
  }
  

  eliminarInstructor(id: number) {
    this.instser.eliminarInstructor(id).subscribe(
      (response) => {
        console.log('El instructor se eliminó', response);
        this.listarInstructores();
        this.snackBar.open('Instructor eliminado correctamente!!.', 'Cerrar', { duration: 3000 });
      },
      (error) => {
        console.log('Error al eliminar al Instructor', error);
        this.snackBar.open('Error al eliminar al Instructor.', 'Cerrar', { duration: 3000 });
      }
    );
  }
}
