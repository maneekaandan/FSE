import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TaskTable } from '../model/tasktable';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable()
export class TaskTableService {
    
  constructor(private _httpClient :HttpClient) { }
  baseUrl: string = 'http://localhost:63825/api/tasktable';

  getTaskTableData(): Observable<TaskTable[]>{
    return this._httpClient.get<TaskTable[]>(this.baseUrl)
        .pipe(
            catchError( this.handleError)
        )
  }

  saveTaskTableData(tt: TaskTable): Observable<TaskTable>{
 
      return this._httpClient.post<TaskTable>(this.baseUrl,
      tt, { headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
    })
    .pipe(catchError(this.handleError));

  }

  updateTask(tt: TaskTable): Observable<void> {
    return this._httpClient.put<void>(`${this.baseUrl}/${tt.taskid}`,tt,{
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    })
    .pipe(catchError(this.handleError));
  }

  deleteUsers(id: number): Observable<void>{
      return this._httpClient.delete<void>(`${this.baseUrl}/${id}`)
        .pipe(catchError(this.handleError));
  }


  private handleError(errorRes: HttpErrorResponse){
      if ( errorRes.error instanceof ErrorEvent){
          console.error('Client Side Error',errorRes.error.message);
      } else {
          console.error('Server Side error ', errorRes);
      }

      return throwError('There is a problem with the server. We are noticed & working on it. Please try again later.');
  }
}