import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dis',
  templateUrl: './edit-dis.component.html',
  styleUrls: ['./edit-dis.component.scss']
})
export class EditDisComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { instructor: any }
  ) {}

  guardar(): void {
    this.dialogRef.close(this.data.instructor); // Devuelve los datos actualizados
  }
}
