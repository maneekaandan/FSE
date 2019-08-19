import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Project } from "../model/project";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable()
export class ProjectService {
    constructor(private _httpClient :HttpClient) { }
    baseUrl: string = 'http://localhost:63825/api/projecttable';
    getProject(): Observable<Project[]>{
        return this._httpClient.get<Project[]>(this.baseUrl)
            .pipe(
                catchError( this.handleError)
            )
      }
    
      saveProject(proj: Project): Observable<Project>{
          console.log(proj);
          return this._httpClient.post<Project>(this.baseUrl,
          proj, { headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
        })
        .pipe(catchError(this.handleError));
    
      }

      updateProj(proj: Project): Observable<void> {
        return this._httpClient.put<void>(`${this.baseUrl}/${proj.projectid}`,proj,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
        .pipe(catchError(this.handleError));
      }
    
      deleteProj(id: number): Observable<void>{
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