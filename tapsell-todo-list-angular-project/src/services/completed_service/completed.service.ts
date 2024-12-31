import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpBaseService } from '../Base/http_base.service';
import { TaskModel } from '../../models/task.model';
import { ListModel } from '../../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class CompletedService extends HttpBaseService {
  constructor(http: HttpClient) {
    super(http, '');
  }


  GetAllCompletedTask(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(
      `${this.apiUrl}compeleted`
    );
  }

  GetMainList(): Observable<ListModel> {
    return this.http.get<ListModel>(
      `${this.apiUrl}mainlist`
    );
  }

}
