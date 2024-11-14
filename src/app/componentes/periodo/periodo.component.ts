import { Component, OnInit } from '@angular/core';
import { Periodo } from 'src/app/modelo/Periodo';
import { PeriodoService } from 'src/app/servicios/periodo.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.scss']
})
export class PeriodoComponent implements OnInit {
  goodMensaje: string = '';
  errorMensaje: string = '';
  errorMensaje2: string = '';
  public periodo: Periodo[] = [];
  newPeriodo: Periodo = new Periodo(0, 0, false, '', new Date(), new Date()); // Cambiado a 0 para 'anio'
  loading: boolean = false;
  loadingEsta: { [key: number]: boolean } = {};
 
  constructor(private peri: PeriodoService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.listarPeriodo();
  }

  listarPeriodo(): void {
    this.peri.obtenerSemestre().subscribe(
      (data) => {
        this.periodo = data.sort((a, b) => b.anio - a.anio); // Ahora funciona correctamente
        console.log('Semestres disponibles: ', this.periodo);
      },
      (error) => {
        console.error('Error al obtener semestres:', error);
        this.errorMensaje = 'Error al cargar los semestres.';
      }
    );    
  }
  
//creaando del toast
  mostrarMensaje(mensaje: string, tipo: 'success' | 'error') {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      panelClass: tipo === 'success' ? 'snackbar-success' : 'snackbar-error',
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  
  crearSemestre(): void {
    const yearPattern = /^\d{4}$/;

    if (!yearPattern.test(this.newPeriodo.anio.toString())) {
      this.errorMensaje = 'Por favor ingrese un año válido';
      this.mostrarMensaje(this.errorMensaje, 'error');
      return;
    }

    if (!this.newPeriodo.anio ||
        !this.newPeriodo.denominacion ||
        !this.newPeriodo.fechaInicial ||
        !this.newPeriodo.fechaFinal) {
      this.errorMensaje = 'Por favor, complete todos los campos';
      this.mostrarMensaje(this.errorMensaje, 'error');
      return;
    }

    if (new Date(this.newPeriodo.fechaFinal) < new Date(this.newPeriodo.fechaInicial)) {
      this.errorMensaje = 'La fecha final debe ser posterior a la fecha inicial.';
      this.mostrarMensaje(this.errorMensaje, 'error');
      return;
    }
    
    this.loading = true;
    this.errorMensaje = '';  // Limpiar errores previos
    this.goodMensaje = '';    // Limpiar mensaje de éxito

    this.peri.crearSemestre(this.newPeriodo).subscribe(
      (response) => {
        console.log('Semestre Creado: ', response);
        this.listarPeriodo();
        this.newPeriodo = new Periodo(0, 0, false, '', new Date(), new Date()); // Cambiado a 0 para 'anio'
        this.goodMensaje = 'Semestre Creado';
        this.mostrarMensaje(this.goodMensaje, 'success');
      setTimeout(() => { this.loading = false;}, 2000);

        // Establecer el nuevo periodo como activo
        this.peri.setPeriodoActivo(response); // Asegúrate de que `response` contenga el nuevo periodo creado
      },
      (error) => {
        console.error('Error al crear el Periodo: ', error);
        this.errorMensaje = 'Ocurrió un error al crear el semestre. Inténtelo otra vez';
        this.mostrarMensaje(this.errorMensaje, 'error');
        setTimeout(() => { this.loading = false; }, 2000);
      }
    );
  }
  
  cambiarEstado(semestre: Periodo): void {
    const nuevoEstado = !semestre.actual;
    this.loadingEsta[semestre.id] = true;

    if (nuevoEstado) {
      const semestreActivo = this.periodo.find(p => p.actual);
      if (semestreActivo && semestreActivo.id !== semestre.id) {
        semestreActivo.actual = false;
        this.peri.cambiarEstadoSemestre(semestreActivo.id, false).subscribe(
          (response) => {
            console.log('Estado del semestre desactivado:', response);
            this.goodMensaje = 'Estado del semestre desactivado';
            this.mostrarMensaje(this.goodMensaje, 'success');
          },
          (error) => {
            console.error('Error al desactivar el semestre:', error);
            this.errorMensaje = 'Ocurrió un error al desactivar el estado. Inténtelo otra vez';
            this.mostrarMensaje(this.errorMensaje, 'error');
          }
        );
      }
    }

    this.peri.cambiarEstadoSemestre(semestre.id, nuevoEstado).subscribe(
      (response) => {
        semestre.actual = nuevoEstado;
        console.log('Estado del semestre actualizado:', response);
        this.listarPeriodo();  // Asegúrate de que la lista se actualice
        this.goodMensaje = 'Estado del semestre actualizado';
        this.mostrarMensaje(this.goodMensaje, 'success');
        setTimeout(() => { this.loadingEsta[semestre.id] = false; }, 2000);
      },
      (error) => {
        console.error('Error al cambiar el estado del semestre:', error);
        this.errorMensaje = 'Ocurrió un error al cambiar el estado. Inténtelo otra vez';
        this.mostrarMensaje(this.errorMensaje, 'error');
        setTimeout(() => { this.loadingEsta[semestre.id] = false; }, 2000);
      }
    );
  }
}
