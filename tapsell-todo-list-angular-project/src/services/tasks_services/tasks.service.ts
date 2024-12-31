import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpBaseService } from '../Base/http_base.service';
import { TaskModel } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService extends HttpBaseService {
  constructor(http: HttpClient) {
    super(http, 'tasks');
  }


  GetAllTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(
      `${this.apiUrl}`
    );
  }

  DeleteTaskByID(ID: string): Observable<TaskModel> {
    return this.http.delete<TaskModel>(
      `${this.apiUrl}/${ID}`
    );
  }

  UpdateTaskByID(ID: string, TaskBody: TaskModel): Observable<TaskModel> {
    return this.http.put<TaskModel>(
      `${this.apiUrl}/${ID}`, TaskBody
    );
  }

  CreateTask(TaskBody: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(
      `${this.apiUrl}`, TaskBody
    );
  }

  GetTasksByListID(ListID: string): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(
      `${this.apiUrl}/query/${ListID}`
    );
  }
}


