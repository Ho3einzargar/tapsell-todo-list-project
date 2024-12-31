import { DialogModule } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks_services/tasks.service';
import { ListsService } from '../../services/lists_services/lists.service';
import { TaskModel } from '../../models/task.model';
import { ListModel } from '../../models/list.model';
import { MatIconModule } from '@angular/material/icon';
import { ActionFormDialogComponent } from '../../dialogs/action-form-dialog/action-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailDialogComponent } from '../../dialogs/task-detail-dialog/task-detail-dialog.component';
import { Router } from '@angular/router';
import { DragDropListComponent } from '../drag-drop-list/drag-drop-list.component';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-list-dynamic',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, DragDropListComponent, DialogModule],
  templateUrl: './list-dynamic.component.html',
  styleUrl: './list-dynamic.component.scss'
})
export class ListDynamicComponent implements OnInit {
  constructor(
    private TaskService: TasksService,
    public snack: MatSnackBar,
    private ListService: ListsService,
    private dialog: MatDialog,
    public router: Router,
  ) {
  }
  allTasks: TaskModel[] = [];
  allLists: ListModel[] = [];
  connectedLists: string[] = [];
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.TaskService.GetAllTasks().pipe(switchMap(task => {
      if (task) this.allTasks = task;
      //? Get List Info
      return this.ListService.GetAllLists();
    }))
      .subscribe(res => {
        this.allLists = res;
        this.connectedLists = this.allLists.map(listItem => listItem._id!);
        this.allLists.forEach(listItem => {
          this.TaskService.GetTasksByListID(listItem._id!).subscribe(tasksList => listItem.tasks = tasksList);
        })
      })
  }

  moveToNewList(event: any) {
    let BodyModel: TaskModel = event.item;
    BodyModel.list = event.listID;
    this.TaskService.UpdateTaskByID(BodyModel._id!, BodyModel).subscribe(res => res)
  }

  newList() {
    const DialogAction = this.dialog.open(ActionFormDialogComponent, {
      maxWidth: '300px',
      maxHeight: '500px',
      data: {
        fields: [{ name: 'title', value: '' }]
      }
    })
    DialogAction.afterClosed().subscribe(res => {
      if (res?.status) {
        let newModelList: ListModel = new ListModel();
        newModelList.title = res.data.title;
        this.ListService.CreateList({ title: res.data.title, isMain: false, date: new Date().getTime() }).subscribe(listCreate => { if (listCreate._id) { this.snack.open(`${res.data.title} create`, '', { duration: 2000 }); this.getData() } })
      }
    })
  }

  updateList(listItem: any) {
    const DialogAction = this.dialog.open(ActionFormDialogComponent, {
      maxWidth: '300px',
      maxHeight: '500px',
      data: {
        fields: [{ name: 'title', value: listItem.title }]
      }
    })
    DialogAction.afterClosed().subscribe(res => {
      if (res?.status) {
        this.ListService.UpdateListByID(listItem._id, res.data.title).subscribe(listCreate => { if (listCreate._id) { this.snack.open(`${res.data.title} updated`, '', { duration: 2000 }); this.getData() } })
      }
    })
  }

  removeList(listID: any) {
    this.ListService.DeleteListByID(listID).subscribe(listRemoved => { if (listRemoved._id) { this.snack.open(`${listRemoved.title} removed`, '', { duration: 2000 }); this.getData() } });
  }

  newTask(listID: any) {
    const DialogAction = this.dialog.open(ActionFormDialogComponent, {
      maxWidth: '300px',
      maxHeight: '500px',
      data: {
        fields: [
          { name: 'title', value: '' },
          { name: 'description', value: '' },
          { name: 'done', value: false, btn: true }
        ]
      }
    })
    DialogAction.afterClosed().subscribe(res => {
      if (res?.status) {
        let newModelTask: TaskModel = new TaskModel();
        newModelTask.title = res.data.title;
        newModelTask.description = res.data.description;
        newModelTask.done = res.data.done;
        newModelTask.list = listID;
        this.TaskService.CreateTask(newModelTask).subscribe(taskCreate => { if (taskCreate._id) { this.snack.open(`${taskCreate.title} create`, '', { duration: 2000 }); this.getData() } })
      }
    })
  }

  showDetailTask(taskItem: TaskModel) {
    const DialogAction = this.dialog.open(TaskDetailDialogComponent, {
      maxWidth: '300px',
      maxHeight: '500px',
      data: taskItem
    })
    DialogAction.afterClosed().subscribe(res => {
      res?.status ? this.getData() : null
    })
  }

}