import { Component, OnInit } from '@angular/core';
import { Periodo } from 'src/app/modelo/Periodo';
import { PeriodoService } from 'src/app/servicios/periodo.service';

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
 
  constructor(private peri: PeriodoService) {}

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

  crearSemestre(): void {
    const yearPattern = /^\d{4}$/;

    if (!yearPattern.test(this.newPeriodo.anio.toString())) {
      this.errorMensaje = 'Por favor ingrese un año válido';
      return;
    }

    if (!this.newPeriodo.anio ||
        !this.newPeriodo.denominacion ||
        !this.newPeriodo.fechaInicial ||
        !this.newPeriodo.fechaFinal) {
      this.errorMensaje = 'Por favor, complete todos los campos';
      return;
    }

    if (new Date(this.newPeriodo.fechaFinal) < new Date(this.newPeriodo.fechaInicial)) {
      this.errorMensaje = 'La fecha final debe ser posterior a la fecha inicial.';
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
        this.goodMensaje = 'Semestre Creado';

      setTimeout(() => { this.loading = false;}, 2000);

        // Establecer el nuevo periodo como activo
        this.peri.setPeriodoActivo(response); // Asegúrate de que `response` contenga el nuevo periodo creado
      },
      (error) => {
        console.error('Error al crear el Periodo: ', error);
        this.errorMensaje = 'Ocurrió un error al crear el semestre. Inténtelo otra vez';
        setTimeout(() => { this.loading = false; }, 2000);
      }
    );
  }
  
  cambiarEstado(semestre: Periodo): void {
    const nuevoEstado = !semestre.actual;

    if (nuevoEstado) {
      const semestreActivo = this.periodo.find(p => p.actual);
      if (semestreActivo && semestreActivo.id !== semestre.id) {
        semestreActivo.actual = false;
        this.peri.cambiarEstadoSemestre(semestreActivo.id, false).subscribe(
          (response) => {
            console.log('Estado del semestre desactivado:', response);
          },
          (error) => {
            console.error('Error al desactivar el semestre:', error);
            this.errorMensaje2 = 'Ocurrió un error al desactivar el semestre. Inténtelo otra vez';
          }
        );
      }
    }

    this.peri.cambiarEstadoSemestre(semestre.id, nuevoEstado).subscribe(
      (response) => {
        semestre.actual = nuevoEstado;
        console.log('Estado del semestre actualizado:', response);
        this.listarPeriodo();  // Asegúrate de que la lista se actualice
      },
      (error) => {
        console.error('Error al cambiar el estado del semestre:', error);
        this.errorMensaje2 = 'Ocurrió un error al cambiar el estado. Inténtelo otra vez';
      }
    );
  }
}
