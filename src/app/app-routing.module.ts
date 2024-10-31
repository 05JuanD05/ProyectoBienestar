import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GUICoordinadorComponent } from './guicoordinador/guicoordinador.component';
import { GUIDirectorComponent } from './guidirector/guidirector.component';
import { GUIEstudianteComponent } from './guiestudiante/guiestudiante.component';
import { GUIInstructorComponent } from './guiinstructor/guiinstructor.component';
import { IPrincipalComponent } from './iprincipal/iprincipal.component';

const routes: Routes = [
  { path: '', component: IPrincipalComponent },
  { path: 'guiEstudiante', component: GUIEstudianteComponent },
  { path: 'guiCoordinador', component: GUICoordinadorComponent },
  { path: 'guiInstructor', component: GUIInstructorComponent },
  { path: 'guiDirector', component: GUIDirectorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
