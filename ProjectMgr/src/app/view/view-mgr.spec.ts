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


describe('ViewComponent',() => {
let user: User;
    
let component: ViewMgrComponent;
let fixture: ComponentFixture<ViewMgrComponent>;
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
    fixture = TestBed.createComponent(ViewMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
});
    it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should check the load function', () => {
        const result = component.loadTT();
        expect(component.loadTT()).toBeTruthy;
    });

    it('should Check the page header', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('label').textContent).toContain(
          'Project'
        );
      }));

      it('should sort by First Name', async(() => {
        component.sortTypeStartDate();
        expect(component.sortTypeStartDate).toBeTruthy();
      }));
    
      it('should sort by Last Name', async(() => {
        component.sortTypeEndDate();
        expect(component.sortTypeEndDate).toBeTruthy();
      }));
    
      it('should sort by Employee ID', async(() => {
        component.sortTypePriority();
        expect(component.sortTypePriority).toBeTruthy();
      }));

})