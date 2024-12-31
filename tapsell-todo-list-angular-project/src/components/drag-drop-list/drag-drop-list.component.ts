import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { ListModel } from '../../models/list.model';
import { MatIconModule } from '@angular/material/icon';
import { CdkDrag, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drag-drop-list',
  standalone: true,
  imports: [CdkDropList, CdkDrag, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './drag-drop-list.component.html',
  styleUrl: './drag-drop-list.component.scss'
})
export class DragDropListComponent {
  constructor(public router: Router) { }
  @Input() cardList: ListModel = new ListModel();
  @Input() connectedLists: string[] = []
  @Output() newTask = new EventEmitter<any>();
  @Output() updateList = new EventEmitter<any>();
  @Output() removeList = new EventEmitter<any>();
  @Output() showDetailTask = new EventEmitter<any>();
  @Output() moveTONewList = new EventEmitter<any>();

  newTaskFun = (event: any) => {
    this.newTask.emit(event);
  };

  updateListFun = (event: any) => {
    this.updateList.emit(event);
  };

  removeListFun = (event: any) => {
    this.removeList.emit(event);
  };

  showDetailTaskFun = (event: any) => {
    this.showDetailTask.emit(event);
  };


  //? When Drop => transfer Item to array destination
  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const movedItem = event.container.data[event.currentIndex];
      this.moveTONewList.emit({ item: movedItem, listID: event.container.id });
    }
  }

  //? When Drop => Check if doesn't main list
  evenPredicate(item: any) {
    return item.data.isMain ? false : true;
  }



}
