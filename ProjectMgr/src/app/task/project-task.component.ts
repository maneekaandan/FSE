import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogPopupComponent } from '../dialog/dialog-popup.component';
import { DialogData } from '../model/DialogData';
import { TaskTableService } from '../service/tasktable.service';
import { UserService } from '../service/user.service';
import { TaskTable } from '../model/tasktable'
import { NgForm } from '@angular/forms';
import { User } from '../model/users';
import { Router, ActivatedRoute } from '@angular/router';
import {formatDate } from '@angular/common';

@Component({
  
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.css']
})
export class ProjectTaskComponent implements OnInit {
  dialogSelectionProj: DialogData;
  dialogSelectionPT: DialogData;
  dialogSelectionUname: DialogData;
  mgrText: string;
  isDisabled: boolean;
  parenttaskText: string;
  unameText: string;
  startDate: Date;
  endDate: Date;
  taskTableList: TaskTable[];
  priority: number;
  private projTaskCreate = new TaskTable();
  private useridUpdate = new User();
  private editTask = new TaskTable();
  editid: number;
  taskname: string;

  constructor(public dialog: MatDialog,
    private taskTableService: TaskTableService,
    private userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
    ) 
    { 
    this.isDisabled = false;
    this.startDate = new Date();
    this.endDate = new Date();
    this.startDate.setDate(this.startDate.getDate() + 1);
    this.endDate.setDate(this.startDate.getDate() + 30);
    this.priority = 15;
    this.editid = -1;
    }


  ngOnInit() {
    this.loadProjectTask();

    this._route.queryParams.subscribe(params => {
      this.editid = params.editId;
      this.editTask.taskid = params.taskid;
      this.editTask.taskdesc = params.taskdesc;
    });

    if (this.editid == 1){
      this.taskname = this.editTask.taskdesc;
      alert('User can change only the Task Name on Task Page and other fields are not applicable to update');
    }
  }

  onChange(){
    this.isDisabled = ! this.isDisabled;
  }

  saveTaskTable(taskForm: NgForm){
    if (taskForm.value.taskname == undefined || taskForm.value.taskname == '')
      {
        alert("Task Name is required");
        return;
      }

    if ( this.editid == 1 ){
      this.editTask.taskdesc = taskForm.value.taskname;
      this.taskTableService.updateTask(this.editTask)
      .subscribe(() => {
        console.log('Updated' );
        this.editid = -1;
        this._router.navigate(['/view']);
      }, (error: any) => {console.log(error)}) ;

      
      
    }
    else
    {
      
    this.projTaskCreate.taskid = this.taskTableList.length + 1;
    this.projTaskCreate.taskdesc = taskForm.value.taskname; 
    if ( this.isDisabled == true){
      this.projTaskCreate.priority = null;
      this.projTaskCreate.startdate = null;
      this.projTaskCreate.enddate = null;
      this.projTaskCreate.parentid = null;
    }
    else
    {
      this.projTaskCreate.priority = this.priority;
      this.projTaskCreate.startdate = this.startDate;
      this.projTaskCreate.enddate = this.endDate;
      this.projTaskCreate.parentid = this.dialogSelectionPT.id;
    }
    
    this.projTaskCreate.projectid = this.dialogSelectionProj.id; 
    this.projTaskCreate.status = 'Started';
    this.useridUpdate.userid = this.dialogSelectionUname.id;
    this.useridUpdate.taskid = this.projTaskCreate.taskid;
    console.log(this.projTaskCreate);

    this.taskTableService.saveTaskTableData(this.projTaskCreate)
      .subscribe((data: TaskTable) => {
        this.userService.updateUsers(this.useridUpdate)
          .subscribe(() => {
            taskForm.reset();
          }, (error: any) => {console.log(error)}) ;

        console.log(data);
      }, (error: any) => { console.log(error); }
      );
    
      
    console.log('TT saved');
      //taskForm.reset();
    }



  }

  loadProjectTask(): void {
    this.taskTableService.getTaskTableData().subscribe( data => { 
      this.taskTableList = data;
      console.log(this.taskTableList.length);
    });
  }

  loadUserDetails(){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
          id: 4,
          title: 'uname'
      };
        
      const dialogRef = this.dialog.open(DialogPopupComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(

          data => {
            if (data != undefined)
            {
              this.dialogSelectionUname = data;
              console.log(this.dialogSelectionUname);
              this.unameText = this.dialogSelectionUname.title;
            }
          }
      );    
  }

  loadParentTaskDetails(){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
          id: 3,
          title: 'parenttask'
      };
        
      const dialogRef = this.dialog.open(DialogPopupComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(

          data => {
            if (data != undefined)
            {
              this.dialogSelectionPT = data;
              console.log(this.dialogSelectionPT);
              this.parenttaskText = this.dialogSelectionPT.title;
            }
          }
      );    

  }

  loadProgDetails(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
          id: 2,
          title: 'projname'
      };

      const dialogRef = this.dialog.open(DialogPopupComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(

          data => {
            if (data != undefined)
            {
              this.dialogSelectionProj = data;
              console.log(this.dialogSelectionProj);
              this.mgrText = this.dialogSelectionProj.title;
            }
          }
      );    

  }

}
