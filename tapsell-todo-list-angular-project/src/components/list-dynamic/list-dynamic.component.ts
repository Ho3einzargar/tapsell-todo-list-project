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
    private ListService: ListsService,
    private dialog: MatDialog,
    public router: Router,
  ) {
  }
  allTasks: TaskModel[] = [];
  allLists: ListModel[] = [];
  connectedLists: string[] = [];
  ngOnInit(): void {
    this.getAllTasks();
    this.getAllLists();
  }

  getAllTasks() {
    this.TaskService.GetAllTasks().subscribe(res => this.allTasks = res)
  }

  getAllLists() {
    this.ListService.GetAllLists().subscribe(res => {
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
    this.TaskService.UpdateTaskByID(BodyModel._id!, BodyModel).subscribe(res => console.log("Updated", res))
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
        console.log("DW", res.data);
        let newModelList: ListModel = new ListModel();
        newModelList.title = res.data.title;
        this.ListService.CreateList({ title: res.data.title, isMain: false, date: new Date().getTime() }).subscribe(listCreate => listCreate._id ? this.getAllLists() : null)
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
        this.ListService.UpdateListByID(listItem._id, res.data.title).subscribe(listCreate => listCreate._id ? this.getAllLists() : null)
      }
    })
  }

  removeList(listID: any) {
    this.ListService.DeleteListByID(listID).subscribe(listCreate => listCreate._id ? this.getAllLists() : null)
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
        this.TaskService.CreateTask(newModelTask).subscribe(taskCreate => taskCreate._id ? this.getAllLists() : null)
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
      res?.status ? this.getAllLists() : null
    })
  }

}