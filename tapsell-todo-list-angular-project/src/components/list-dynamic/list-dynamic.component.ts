import { DialogModule } from '@angular/cdk/dialog';
import { Component, inject, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks_services/tasks.service';
import { ListsService } from '../../services/lists_services/lists.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { TaskModel } from '../../models/task.model';
import { ListModel } from '../../models/list.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActionFormDialogComponent } from '../../dialogs/action-form-dialog/action-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailDialogComponent } from '../../dialogs/task-detail-dialog/task-detail-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-dynamic',
  standalone: true,
  imports: [CdkDropList, CdkDrag, MatIconModule, MatButtonModule, MatTooltipModule, DialogModule],
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
    // this.getMainList();
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

  evenPredicate(item: any) {
    return item.data.isMain ? false : true;
  }

  moveToNewList(item: any, listID: any) {
    console.log("TE", item);
    let BodyModel: TaskModel = item;
    BodyModel.list = listID;
    console.log("Body", BodyModel);
    this.TaskService.UpdateTaskByID(BodyModel._id!, BodyModel).subscribe(res => console.log("SUBED", res))
  }

  drop(event: any) {
    console.log("EV", event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log("IF");
    } else {
      console.log("ELS");
      console.log("1", event.previousContainer.data);
      console.log("2", event.container.data);
      console.log("3", event.previousIndex);
      console.log("4", event.currentIndex);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const movedItem = event.container.data[event.currentIndex];
      this.moveToNewList(movedItem, event.container.id);
    }
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
        console.log("DW", newModelTask);
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
      if (res?.status) {
        this.getAllLists()
        // let newModelTask: TaskModel = new TaskModel();
        // newModelTask.title = res.data.title;
        // newModelTask.description = res.data.description;
        // newModelTask.done = res.data.done;
        // newModelTask.list = listID;
        // console.log("DW", newModelTask);
        // this.TaskService.CreateTask(newModelTask).subscribe(taskCreate => taskCreate._id ? this.getAllLists() : null)
      }
    })
  }

}