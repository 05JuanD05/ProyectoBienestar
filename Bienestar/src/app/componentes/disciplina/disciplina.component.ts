import { Component } from '@angular/core';
import { Disciplina } from 'src/app/modelo/Disciplina';
import { DisciplinaService } from 'src/app/servicios/disciplina.service';

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.component.scss']
})
export class DisciplinaComponent {
  disciplina: Disciplina = new Disciplina(0, "", "", "");

  public disciplinas: Disciplina[] = this.disciser.disciplinas;

  constructor(private disciser: DisciplinaService) {

  }

  ngOnInit() {
    this.listarDisciplinas();
  }

  cambioEstado(event: Event) {
    const id = (event.target as HTMLElement).id;
    
    const boton = document.getElementById('esta2') as HTMLButtonElement;
    const boton2 = document.getElementById('add') as HTMLButtonElement;

    if (id === 'esta') {
      boton2.disabled = true;
      boton.disabled = false;
    } else if (id === 'esta2') {
      boton2.disabled = false;
      boton.disabled = true;
    }
  }

  listarDisciplinas() {
    this.disciser.obtenerDisciplinas().subscribe(
      (data) => {
        this.disciplinas = data;
        console.log(this.disciplinas);
        
      }
    );
  }

  crearDisciplina(): void {
    this.disciplina.id = this.disciser.disciplinas.length;
    this.disciser.createDisciplina(this.disciplina).subscribe(
      (response) => {
        console.log('Disciplina agregada:', response);
        this.listarDisciplinas();
        this.disciplina = new Disciplina(0, "", "", "");
      });
    
  }

  eliminarDisciplina(id: number) {
    this.disciser.eliminarDisciplina(id).subscribe(
      (response) => {
        console.log('El Disciplina se eliminó con éxito:', response);
        this.listarDisciplinas();
        this.disciplina = new Disciplina(0, "", "", "");
      }
    );
  }


  consultarDisciplina(id: number){
    this.disciser.consultarDisciplina(id).subscribe(
      (data) => {
        this.disciplina = data;
      }
    );
  }

  actualizarDisciplina(id: number, datosActualizados: any) {
    this.disciser.actualizarDisciplina(id, datosActualizados).subscribe(
      (response) => {
        console.log('Area actualizada:', response);
        this.listarDisciplinas();
        this.disciplina = new Disciplina(0, "", "", "");
        // Puedes realizar acciones adicionales después de la actualización
      }
    );
  }


}
