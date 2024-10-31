import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileSaverModule } from 'ngx-filesaver';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActividadComponent } from './componentes/actividad/actividad.component';
import { AreaComponent } from './componentes/area/area.component';
import { AsistenciaComponent } from './componentes/asistencia/asistencia.component';
import { CoordinadorComponent } from './componentes/coordinador/coordinador.component';
import { CronogramaActividadesInstructorComponent } from './componentes/cronograma-actividades-instructor/cronograma-actividades-instructor.component';
import { DisciplinaComponent } from './componentes/disciplina/disciplina.component';
import { EscenarioComponent } from './componentes/escenario/escenario.component';
import { HorarioCulturalComponent } from './componentes/horarios/horario-cultural/horario-cultural.component';
import { HorarioDeportivoComponent } from './componentes/horarios/horario-deportivo/horario-deportivo.component';
import { HorarioIDeportivoComponent } from './componentes/horarios/horario-i-deportivo/horario-i-deportivo.component';
import { MiHorarioComponent } from './componentes/horarios/mi-horario/mi-horario.component';
import { ImageUploaderComponent } from './componentes/imagenes/image-uploader.component';
import { ImageViewerComponent } from './componentes/imagenes/image-viewer.component';
import { InscripcionComponent } from './componentes/inscripcion/inscripcion.component';
import { InstructorComponent } from './componentes/instructor/instructor.component';
import { ListaInscripcionComponent } from './componentes/lista-inscripcion/lista-inscripcion.component';
import { PeriodoComponent } from './componentes/periodo/periodo.component';
import { ProgramaComponent } from './componentes/programa/programa.component';
import { TipoActividadComponent } from './componentes/tipo-actividad/tipo-actividad.component';
import { GUICoordinadorComponent } from './guicoordinador/guicoordinador.component';
import { GUIDirectorComponent } from './guidirector/guidirector.component';
import { GUIEstudianteComponent } from './guiestudiante/guiestudiante.component';
import { GUIInstructorComponent } from './guiinstructor/guiinstructor.component';
import { IPrincipalComponent } from './iprincipal/iprincipal.component';
import { PInicioComponent } from './pinicio/pinicio.component';
import { InformadorComponent } from './utilidades/informador/informador.component';


@NgModule({
  declarations: [
    AppComponent,
    IPrincipalComponent,
    GUICoordinadorComponent,
    GUIEstudianteComponent,
    GUIInstructorComponent,
    GUIDirectorComponent,
    PInicioComponent,
    ActividadComponent,
    PeriodoComponent,
    AreaComponent,
    EscenarioComponent,
    ProgramaComponent,
    InscripcionComponent,
    DisciplinaComponent,
    TipoActividadComponent,
    AsistenciaComponent,
    InstructorComponent,
    CoordinadorComponent,
    InformadorComponent,
    ImageUploaderComponent,
    ImageViewerComponent,
    HorarioDeportivoComponent,
    HorarioCulturalComponent,
    HorarioIDeportivoComponent,
    MiHorarioComponent,
    ListaInscripcionComponent,
    CronogramaActividadesInstructorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FileSaverModule,
    HttpClientModule,ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule
    
  ],
  providers: [DisciplinaComponent,InformadorComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
