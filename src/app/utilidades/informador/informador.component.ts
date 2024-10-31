import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-informador',
  templateUrl: './informador.component.html',
  styleUrls: ['./informador.component.scss']
})
export class InformadorComponent {
  constructor(private toastr: ToastrService) {}

  mostrarExito(mensaje:string) {
    this.toastr.success(mensaje, 'Éxito');
  }

  mostrarError(mensaje:string) {
    this.toastr.error(mensaje, 'Error');
  }

  mostrarAlerta(mensaje:string) {
    this.toastr.warning(mensaje, 'Advertencia');
  }
}
