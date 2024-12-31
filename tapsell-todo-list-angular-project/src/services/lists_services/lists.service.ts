import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListModel } from '../../models/list.model';
import { HttpClient } from '@angular/common/http';
import { HttpBaseService } from '../Base/http_base.service';

@Injectable({
  providedIn: 'root'
})
export class ListsService extends HttpBaseService {
  constructor(http: HttpClient) {
    super(http, 'lists');
  }


  GetAllLists(): Observable<ListModel[]> {
    return this.http.get<ListModel[]>(
      `${this.apiUrl}`
    );
  }

  GetListByListID(ListID: string): Observable<ListModel> {
    return this.http.get<ListModel>(
      `${this.apiUrl}/${ListID}`
    );
  }

  DeleteListByID(ID: string): Observable<ListModel> {
    return this.http.delete<ListModel>(
      `${this.apiUrl}/${ID}`
    );
  }

  CreateList(ListBody: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}`, ListBody
    );
  }

  UpdateListByID(ID: string, listTitle: string): Observable<ListModel> {
    return this.http.put<ListModel>(
      `${this.apiUrl}/${ID}`, { title: listTitle }
    );
  }


}
