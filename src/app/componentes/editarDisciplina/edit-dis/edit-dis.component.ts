import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DisciplinaService } from 'src/app/servicios/disciplina.service';
import { Disciplina } from 'src/app/modelo/Disciplina';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InstructorService } from 'src/app/servicios/instructor.service';
import { Instructor } from 'src/app/modelo/Instructor';

@Component({
  selector: 'app-edit-dis',
  templateUrl: './edit-dis.component.html',
  styleUrls: ['./edit-dis.component.scss']
})
export class EditDisComponent implements OnInit {
  public instructor: Instructor = new Instructor(0, "", "", "", "", "", "", "",new Disciplina(0, "", "",""), "", "");
  public disciplinas: Disciplina[] = []; // Lista de disciplinas disponibles
  public showEditModal: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditDisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { instructor: any },
    private disciplinaService: DisciplinaService,
    private readonly snackBar: MatSnackBar,
    private readonly instructorService: InstructorService // Servicio para obtener disciplinas
  ) {}

  ngOnInit(): void {
    this.listarDisciplinas(); // Cargar las disciplinas disponibles
  }

  listarDisciplinas(): void {
    this.disciplinaService.obtenerDisciplinas().subscribe(
      (disciplinas) => {
        this.disciplinas = disciplinas.filter(d => d.estado === 'Activo'); // Solo disciplinas activas
      },
      (error) => {
        console.error('Error al cargar disciplinas:', error);
      }
    );
  }

  cerrarModal() {
    this.showEditModal = false;
    this.instructor = new Instructor(0, "", "", "", "", "", "", "",new Disciplina(0, "", "",""), "", "");
  }

  editarInstructor(): void {
    const id = this.data.instructor.id; // Obtén el ID del instructor desde los datos inyectados
    const instruActu = this.data.instructor; // El objeto actualizado
  
    if (!id) {
      console.error('El ID del instructor no es válido:', id);
      return;
    }
  
    this.instructorService.actualizarInstructor(id, instruActu).subscribe(
      (response) => {
        console.log('Instructor actualizado:', response);
        this.dialogRef.close(instruActu); // Cierra el modal y devuelve los datos actualizados
        this.snackBar.open('Instructor actualizado exitosamente.', 'Cerrar', { duration: 3000 });
      },
      (error) => {
        console.error('Error al actualizar el instructor:', error);
        this.snackBar.open('Error al actualizar el instructor.', 'Cerrar', { duration: 3000 });
      }
    );
  }
  
}