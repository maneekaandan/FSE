import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {User} from "../model/users";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable()
export class UserService {
    
  constructor(private _httpClient :HttpClient) { }
  baseUrl: string = 'http://localhost:63825/api/usertable';

  getUsers(): Observable<User[]>{
    return this._httpClient.get<User[]>(this.baseUrl)
        .pipe(
            catchError( this.handleError)
        )
  }

  saveUsers(user: User): Observable<User>{
      console.log(user);
      return this._httpClient.post<User>(this.baseUrl,
      user, { headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
    })
    .pipe(catchError(this.handleError));

  }

  updateUsers(user: User): Observable<void> {
    return this._httpClient.put<void>(`${this.baseUrl}/${user.userid}`,user,{
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