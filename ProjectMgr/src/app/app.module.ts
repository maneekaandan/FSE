import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from './service/user.service';
import { HttpClientModule } from '@angular/common/http';
import {  DatepickerModule,BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ProjectMgrComponent } from './project/project-mgr.component';
import { ProjectTaskComponent } from './task/project-task.component';
import { ProjectUserComponent } from './user/project-user.component';
import { ViewMgrComponent } from './view/view-mgr.component';
import { SearchPipe } from './searchfilter/usersearch';
import { DialogPopupComponent } from './dialog/dialog-popup.component';
import {MatDialogModule} from "@angular/material";
import { ProjectService } from './service/project.service';
import { ParentTaskService } from './service/parenttask.service';
import { TaskTableService } from './service/tasktable.service';
import { FilterPipe} from './searchfilter/filter.pipe';
import { ProjFilterPipe } from './searchfilter/projfilter.pipe';


const appRoutes: Routes = [
  { path: 'view', component: ViewMgrComponent },
  { path: 'user', component: ProjectUserComponent },
  { path: 'project', component: ProjectMgrComponent },
  { path: 'task', component: ProjectTaskComponent },
  { path:'', redirectTo: '/view', pathMatch: 'full'}
];



@NgModule({
  declarations: [
    SearchPipe,
    FilterPipe,
    ProjFilterPipe,
    AppComponent,
    ProjectMgrComponent,
    ProjectTaskComponent,
    ProjectUserComponent,
    ViewMgrComponent,
    DialogPopupComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatDialogModule,
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ UserService, ProjectService, ParentTaskService, TaskTableService],
  bootstrap: [AppComponent],
  entryComponents: [DialogPopupComponent]
})
export class AppModule { }
