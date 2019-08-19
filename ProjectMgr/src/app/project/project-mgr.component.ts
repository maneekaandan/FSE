import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogPopupComponent } from '../dialog/dialog-popup.component';
import { ProjectService } from '../service/project.service';
import { TaskTableService } from '../service/tasktable.service';
import { UserService } from '../service/user.service';
import { Project } from '../model/project';
import {  TaskTable } from '../model/tasktable';
import { NgForm } from '@angular/forms';
import { delay } from 'q';
import { DialogData } from '../model/DialogData';
import { User } from '../model/users';
import { TaskCountDetails } from '../model/taskcountdetails';

@Component({
  
  templateUrl: './project-mgr.component.html',
  styleUrls: ['./project-mgr.component.css']
})
export class ProjectMgrComponent implements OnInit {

  projname: string;
  startDate: Date;
  endDate: Date;
  isDisabled: boolean;
  priority: number;
  dialogResult: string;
  dname: string = 'project';
  private projectCreate = new Project();
  projectList: Project[];
  taskList: TaskTable[];
  isEdit: boolean = false;
  dialogSelection: DialogData;
  private user = new User();
  private taskCountList: TaskCountDetails[] = [];
  mgrText: string;
  buttonText: string;
  searchFlag: string;
  isbtnDisabled: boolean;
  private projEdit = new Project();

  constructor(public dialog: MatDialog,
    private userService: UserService,
    private projectService: ProjectService,
    private taskService: TaskTableService) {
    this.priority = 10;
    this.isDisabled = true;
    this.startDate = new Date();
    this.endDate = new Date();
    this.startDate.setDate(this.startDate.getDate() + 1);
    this.endDate.setDate(this.startDate.getDate() + 30);
    this.mgrText="";
    this.buttonText = "Add";
    this.projname= "";
    this.isbtnDisabled = false;
   }

  ngOnInit() {
    this.loadProject();
    
  }

  ngOnDestroy() {
  }


  sortStartdate(){
    this.taskCountList = this.taskCountList.sort( function (obj1: any, obj2: any) {
      if ( obj1.startdate < obj2.startdate ) {
        return -1;
      } else  if ( obj1.startdate > obj2.startdate) {
        return 1;
      } else { return 0; }
  });
  }

  sortEnddate(){
    this.taskCountList = this.taskCountList.sort( function (obj1: any, obj2: any) {
      if ( obj1.enddate < obj2.enddate ) {
        return -1;
      } else  if ( obj1.enddate > obj2.enddate) {
        return 1;
      } else { return 0; }
  });
  }

  sortPriority(){
    this.taskCountList = this.taskCountList.sort( function (obj1: any, obj2: any) {
      return  (obj1.priority - obj2.priority);
    });
  }

  sortCompleted(){
    this.taskCountList = this.taskCountList.sort( function (obj1: any, obj2: any) {
      return  (obj1.completed - obj2.completed);
    });
  }


  editProj(proj: TaskCountDetails){
    this.isEdit = true;
    this.buttonText = "Update";
    this.projEdit.projectid = proj.projectid;
    this.projEdit.projectdesc = proj.projectdesc;
    this.projEdit.priority = proj.priority;
    this.projEdit.startdate = proj.startdate;
    this.projEdit.enddate = proj.enddate;
    this.priority = this.projEdit.priority;
    this.projname = this.projEdit.projectdesc;
    this.startDate = this.projEdit.startdate;
    this.endDate = this.projEdit.enddate;
    this.isbtnDisabled = true;
  }

  suspendProj(proj: TaskCountDetails){
    alert('Deleting...')
    console.log(proj);
    this.projectService.deleteProj(proj.projectid)
      .subscribe(
        () => {

          alert(`User Id = ${proj.projectid} has been deleted`);
          delay(2000);
          window.location.reload();
        },
        (err) => { console.log(err); }
      );
  }
  loadTask(): void {
    this.taskService.getTaskTableData()
    .subscribe( data => { this.taskList = data; 
    this.taskList = this.taskList.sort( this.sortByProjId);

    let projID: number = 1;
    let count: number = 1;
    let totTask: number = 0;
    let completed: number  = 0;

    for ( let i = 0; i < this.taskList.length; i++){
      
      if (projID == this.taskList[i].projectid )
      { 
        console.log(totTask);
        totTask++;
        if ( projID == this.taskList[i].projectid && this.taskList[i].status == 'Completed')
          { completed++; }
        count++;
      }
      else 
      {
        
        this.taskCountList.push({totalTask: totTask, 
          completed: completed,
        });
        projID++;
        totTask = 1;
        if ( projID == this.taskList[i].projectid && this.taskList[i].status == 'Completed')
           { completed =1; }
          else 
         { completed = 0; }
        if ( count == this.taskList.length )
        {
          this.taskCountList.push({totalTask: totTask, completed: completed});
        }
      }
      
      
      
    }

    count = this.projectList.length - this.taskCountList.length;
    
    for (let i =0; i < count; i++ )
    this.taskCountList.push({totalTask: 0, completed: 0});

    

    for ( let i=0; i < this.projectList.length; i++ )
    {
      this.taskCountList[i].projectid = this.projectList[i].projectid;
      this.taskCountList[i].projectdesc = this.projectList[i].projectdesc;
      this.taskCountList[i].startdate = this.projectList[i].startdate;
      this.taskCountList[i].enddate = this.projectList[i].enddate;
      this.taskCountList[i].priority = this.projectList[i].priority;
    }

    });
  }

  sortByProjId(c1: TaskTable, c2: TaskTable){
    if (c1.projectid > c2.projectid ) return 1
    else if ( c1.projectid === c2.projectid ) return 0
    else return -1;

  }

  loadProject(): void {
    this.projectService.getProject()
    .subscribe( data => {
      this.projectList = data;
      this.loadTask();

    });
  }
  
  loadMgrDetails(): void{

    const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
          id: 1,
          title: 'uname'
      };
      //dialogConfig.position = {
      //  'top': '100',
      //  left: '100'
    //};
    
  
      const dialogRef = this.dialog.open(DialogPopupComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(

          data => {
            if (data != undefined)
            {
              this.dialogSelection = data;
              console.log(this.dialogSelection);
              this.mgrText = this.dialogSelection.title;
            }
          }
      );    

    console.log("Select Mgr Details");
  }

  onChange(){
    this.isDisabled = ! this.isDisabled;
  }

  onRest(){
    delay(2000);
    this.projectList=undefined;
    this.loadProject();
    this.startDate.setDate(this.startDate.getDate() + 1);
    this.endDate.setDate(this.startDate.getDate() + 30);
    this.isDisabled = true;
    console.log('Rest');
  }
  saveProject(userFrm: NgForm):void{ 
    if (userFrm.value.projname == undefined || userFrm.value.projname == '')
    {
      console.log("ProjectName is required");
      return;
    }

    if (this.isEdit){
      this.isEdit = false;
      this.buttonText = "Add";
      this.isbtnDisabled = true;
      this.projEdit.priority = this.priority;
      this.projEdit.projectdesc = this.projname;
      this.projEdit.startdate = this.startDate;
      this.projEdit.enddate = this.endDate; 
      this.projectService.updateProj(this.projEdit).subscribe(() => {
        this.onRest();
        alert('Updated');
      },(error: any) => {console.log(error)});
    }
    else
    {
     
    
    this.projectCreate.projectid = this.projectList.length + 1;
    
    this.projectCreate.projectdesc = userFrm.value.projname;
    this.projectCreate.priority = this.priority;
    if ( this.isDisabled )
    {
      this.projectCreate.startdate = null;
      this.projectCreate.enddate = null;
      
    }
    else
    {
      this.projectCreate.startdate = this.startDate;
      this.projectCreate.enddate = this.endDate;
    }
    
    this.user.userid = this.dialogSelection.id;
    this.user.projectid = this.projectCreate.projectid;
    console.log(this.user);

    this.userService.updateUsers(this.user)
      .subscribe(() => {
        
      }, (error: any) => {console.log(error)}) ;

    this.projectService.saveProject(this.projectCreate)
      .subscribe((data: Project) => {
        console.log(data.projectid);
        console.log('Project saved');
        this.onRest();
      }, (error: any) => { console.log(error); }
      );
      
    }
  }
}
