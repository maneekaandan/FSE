import {  ProjectUserComponent} from '../user/project-user.component';
import { async, ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UserService} from '../service/user.service'
import { FilterPipe} from '../searchfilter/filter.pipe';
import { SearchPipe } from '../searchfilter/usersearch';
import { ProjFilterPipe} from '../searchfilter/projfilter.pipe';
import { AppComponent } from '../app.component';
import { DialogPopupComponent } from '../dialog/dialog-popup.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {  DatepickerModule,BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ViewMgrComponent } from '../view/view-mgr.component';
import { ProjectMgrComponent } from '../project/project-mgr.component';
import { ProjectTaskComponent } from '../task/project-task.component';
import {MatDialogModule} from "@angular/material";
import {User} from "../model/users";

const appRoutes: Routes = [
    { path: 'view', component: ViewMgrComponent },
    { path: 'user', component: ProjectUserComponent },
    { path: 'project', component: ProjectMgrComponent },
    { path: 'task', component: ProjectTaskComponent },
    { path:'', redirectTo: '/view', pathMatch: 'full'}
  ];


describe('ProjComponent',() => {

    
let component: ProjectTaskComponent;
let fixture: ComponentFixture<ProjectTaskComponent>;
let debugElement: DebugElement;
let el: HTMLElement;

beforeEach(async( () =>  {
    TestBed.configureTestingModule({
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
          providers: [ UserService ]
         
    }).compileComponents();
}));

beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
});
    it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should check the load function', () => {
        const result = component.loadProjectTask();
        expect(component.loadProjectTask()).toBeTruthy;
    });

    it('should Check the page header', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h3').textContent).toContain(
          'Task Page'
        );
      }));
      
      it('should Reset all values', async(() => {
        component.onChange();
        expect(component.onChange).toBeTruthy();
      }));
})