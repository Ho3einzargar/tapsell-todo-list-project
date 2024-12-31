import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog'; import { MatButtonModule } from '@angular/material/button';;
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-action-form-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatDialogContent, MatDialogClose, MatSlideToggleModule, MatDialogActions, MatButtonModule],
  templateUrl: './action-form-dialog.component.html',
  styleUrl: './action-form-dialog.component.scss'
})
export class ActionFormDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ActionFormDialogComponent>) { }
  data = inject(DIALOG_DATA);
  formKey: any[] = [];
  actButtonForm: FormGroup = new FormGroup({});
  ngOnInit(): void {
    console.log("GET DATA", this.data);
    this.setValueForm(this.data['fields']);
  }

  setValueForm(fields: any) {
    fields.forEach((source: any) => {
      console.log('Source Value', source);
      this.actButtonForm.addControl(source.name, new FormControl(source.value));
      this.formKey.push(source);
    });
  }
  acceptBtn() {
    console.log("ACT", this.actButtonForm.value);
    this.dialogRef.close({ status: true, data: this.actButtonForm.value })
  }


}


export interface actionModalAfterCloseModel {
  status: boolean;
  data?: any;
}