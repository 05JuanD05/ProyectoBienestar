import { Component } from '@angular/core';
import { Programa } from 'src/app/modelo/Programa';
import { ProgramaService } from 'src/app/servicios/programa.service';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.scss']
})
export class ProgramaComponent {
  public programa: Programa = new Programa(0, "", "", "");
  public programas: Programa[] = this.program.programas;
  public showEditModal: boolean = false;

  constructor(private program: ProgramaService) { }

  ngOnInit() {
    this.listarProgramas();
  }

  listarProgramas() {
    this.program.obtenerProgramas().subscribe(
      (data) => {
        this.programas = data;
      }
    );
  }

  abrirModal(id: number) {
    this.consultarPrograma(id);
    this.showEditModal = true;
  }

  cerrarModal() {
    this.showEditModal = false;
    this.programa = new Programa(0, "", "", "");  
  }

  crearPrograma(): void {
    this.programa.id = this.program.programas.length;
    this.program.createPrograma(this.programa).subscribe(
      (response) => {
        console.log('Programa creado: ', response);
        this.listarProgramas();
        this.programa = new Programa(0, "", "", "");
      }
    );
  }

  eliminarPrograma(id: number) {
    this.program.eliminarPrograma(id).subscribe(
      (response) => {
        console.log('Programa eliminado: ', response);
        this.listarProgramas();
        this.programa = new Programa(0, "", "", "");
      }
    );
  }

  consultarPrograma(id: number) {
    this.program.consultarPrograma(id).subscribe(
      (data) => {
        this.programa = data;
      }
    );
  }

  actualizarPrograma(id: number, datosActualizados: any) {
    this.program.actualizarPrograma(id, datosActualizados).subscribe(
      (response) => {
        console.log('Programa actualizado', response);
        this.listarProgramas();
        this.cerrarModal();  // Cierra la modal después de guardar
      }
    );
  }
}
