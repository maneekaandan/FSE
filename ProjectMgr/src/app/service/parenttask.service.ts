import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {ParentTask} from "../model/parenttask";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable()
export class ParentTaskService {
    
  constructor(private _httpClient :HttpClient) { }
  baseUrl: string = 'http://localhost:63825/api/parenttask';

  getParentTask(): Observable<ParentTask[]>{
    return this._httpClient.get<ParentTask[]>(this.baseUrl)
        .pipe(
            catchError( this.handleError)
        )
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