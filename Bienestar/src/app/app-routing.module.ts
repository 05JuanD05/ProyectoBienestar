import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GUICoordinadorComponent } from './guicoordinador/guicoordinador.component';
import { GUIDirectorComponent } from './guidirector/guidirector.component';
import { GUIEstudianteComponent } from './guiestudiante/guiestudiante.component';
import { GUIInstructorComponent } from './guiinstructor/guiinstructor.component';
import { IPrincipalComponent } from './iprincipal/iprincipal.component';
import { ListaInscripcionComponent } from './componentes/lista-inscripcion/lista-inscripcion.component';
import { CronogramaActividadesInstructorComponent } from './componentes/cronograma-actividades-instructor/cronograma-actividades-instructor.component';
import { HorarioDeportivoComponent } from './componentes/horarios/horario-deportivo/horario-deportivo.component';
import { HorarioCulturalComponent } from './componentes/horarios/horario-cultural/horario-cultural.component';

const routes: Routes = [
  { path: '', component: IPrincipalComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'guiEstudiante', component: GUIEstudianteComponent },
  { path: 'guiCoordinador', component: GUICoordinadorComponent },
  { path: 'guiInstructor', component: GUIInstructorComponent },
  { path: 'guiDirector', component: GUIDirectorComponent},
  { path:'lista-inscripcion',component: ListaInscripcionComponent },
  { path:'cronograma-actividades',component: CronogramaActividadesInstructorComponent},
  { path:'horario-deportivo',component: HorarioDeportivoComponent},
  { path: 'horario-cultural',component: HorarioCulturalComponent},
  { path: '', redirectTo: '/lista-inscripcion', pathMatch: 'full' },
  { path: '', redirectTo: '/cronograma-actividades', pathMatch: 'full' },
  { path: '', redirectTo: '/guiInstructor', pathMatch: 'full' },
  { path: '', redirectTo: '/horario-deportivo', pathMatch: 'full' },
  { path: '', redirectTo: '/horario-cultural', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
