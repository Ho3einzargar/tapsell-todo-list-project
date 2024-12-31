import { Component, OnInit } from '@angular/core';
import { CompletedService } from '../../services/completed_service/completed.service';
import { TaskModel } from '../../models/task.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { TasksService } from '../../services/tasks_services/tasks.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [MatCheckboxModule, MatCardModule, MatListModule, MatButtonModule, MatIconModule, MatTooltip],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.scss'
})
export class CompletedTasksComponent implements OnInit {
  allTasks: TaskModel[] = [];
  constructor(
    private completedService: CompletedService,
    private taskService: TasksService,
  ) { }
  ngOnInit(): void {
    this.getTasks();
  }
  getTasks() {
    this.completedService.GetAllCompletedTask().subscribe(res => this.allTasks = res)
  }
  removeTask(taskID: string) {
    this.taskService.DeleteTaskByID(taskID).subscribe(res => res._id ? this.getTasks() : null)
  }
}

