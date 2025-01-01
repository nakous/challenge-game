import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-material-modal',
  templateUrl: './material-modal.component.html',
  styleUrls: ['./material-modal.component.css']
})
export class MaterialModalComponent {
  constructor(
    public dialogRef: MatDialogRef<MaterialModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; explain: string }
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}