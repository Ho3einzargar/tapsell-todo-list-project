import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { TasksService } from '../../services/tasks_services/tasks.service';
import { ListsService } from '../../services/lists_services/lists.service';
import { ActivatedRoute } from '@angular/router';
import { TaskModel } from '../../models/task.model';
import { ListModel } from '../../models/list.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActionFormDialogComponent } from '../../dialogs/action-form-dialog/action-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TaskDetailDialogComponent } from '../../dialogs/task-detail-dialog/task-detail-dialog.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-list-detail',
  standalone: true,
  imports: [MatExpansionModule, MatCheckboxModule, MatSlideToggleModule, MatCardModule, MatListModule, MatIconModule, MatTooltip, MatButtonModule, DialogModule],
  templateUrl: './list-detail.component.html',
  styleUrl: './list-detail.component.scss'
})
export class ListDetailComponent implements OnInit {
  listID: string = '';
  allTasks: TaskModel[] = [];
  listInfo: ListModel = new ListModel();
  Date = new Date()
  constructor(
    private dialog: MatDialog,
    private TaskService: TasksService,
    private ListService: ListsService,
    private ActiveRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ActiveRoute.params.subscribe((param: any) => {
      if (param.id) this.listID = param.id;
    });

    this.getTasks();
    this.getInfoMethod();
    this.getInfoLists();
  }

  getInfoMethod() {
    this.getTasks()
    this.getInfoLists()
  }
  getTasks() {
    this.TaskService.GetTasksByListID(this.listID).subscribe(res => this.allTasks = res)
  }


  removeList(listID: any) {
    this.ListService.DeleteListByID(listID).subscribe(listCreate => listCreate._id ? this.getInfoMethod() : null)
  }


  getInfoLists() {
    this.ListService.GetListByListID(this.listID).subscribe(listItem => {
      listItem.tasks = this.allTasks;
      this.listInfo = listItem;
      console.log("LL", listItem);

    })
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
        this.TaskService.CreateTask(newModelTask).subscribe(taskCreate => taskCreate._id ? this.getInfoMethod() : null)
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
        this.ListService.UpdateListByID(listItem._id, res.data.title).subscribe(listCreate => listCreate._id ? this.getInfoMethod() : null)
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
      res?.status ? this.getInfoMethod() : null
    })
  }

}
