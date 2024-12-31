import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog'; import { MatButtonModule } from '@angular/material/button';;
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TasksService } from '../../services/tasks_services/tasks.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-task-detail-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatDialogContent, MatDialogClose, MatSlideToggleModule, MatDialogActions, MatButtonModule],
  templateUrl: './task-detail-dialog.component.html',
  styleUrl: './task-detail-dialog.component.scss'
})
export class TaskDetailDialogComponent implements OnInit {
  constructor(public fB: FormBuilder, public dialogRef: MatDialogRef<TaskDetailDialogComponent>,
    private taskService: TasksService,
    private snack: MatSnackBar
  ) { }
  data = inject(DIALOG_DATA);
  taskForm: any
  ngOnInit(): void {
    this.taskForm = this.fB.group({
      title: [this.data.title, Validators.required],
      description: [this.data.description],
      done: [this.data.done],
      list: [this.data.list]
    })

  }

  removeBtn() {
    this.taskService.DeleteTaskByID(this.data._id).subscribe(res => { if (res._id) { this.snack.open(`${res.title} removed`, '', { duration: 2000 }); this.dialogRef.close({ status: true }) } })
  }

  updateBtn() {
    this.taskService.UpdateTaskByID(this.data._id, this.taskForm.value).subscribe(res => { if (res._id) { this.snack.open(`${res.title} updated`, '', { duration: 2000 }); this.dialogRef.close({ status: true }) } })
  }


}
