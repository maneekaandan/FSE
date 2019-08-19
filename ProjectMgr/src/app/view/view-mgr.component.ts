import { Component, OnInit } from '@angular/core';
import { TaskTable } from '../model/tasktable';
import { TaskTableService } from '../service/tasktable.service';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogPopupComponent } from '../dialog/dialog-popup.component';
import { DialogData } from '../model/DialogData';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-mgr',
  templateUrl: './view-mgr.component.html',
  styleUrls: ['./view-mgr.component.css']
})
export class ViewMgrComponent implements OnInit {

  dialogSelectionProj: DialogData;
  taskTableList: TaskTable[];
  searchProjText: string;
  endDate: Date;

  constructor(private taskTableService: TaskTableService,
    public dialog: MatDialog,
    private _router: Router) { }

  ngOnInit() {
    this.loadTT()
  }

  editTask(tt: TaskTable){

    this._router.navigate(['/task'],{queryParams: { 
      editId: '1',
      taskid: tt.taskid,
      taskdesc: tt.taskdesc
    }});
  }

  endTask(tt: TaskTable){
    tt.status = 'Completed';
    this.endDate = new Date();
    this.endDate.setDate(this.endDate.getDate() + 1);
    tt.enddate = this.endDate;

    this.taskTableService.updateTask(tt)
      .subscribe(() => {

        this.loadTT();
        alert('End Date updated');
      }, (error: any) => {console.log(error)}) ;
  }

  loadTT(): void {
    this.taskTableService.getTaskTableData()
    .subscribe( data => this.taskTableList = data);
  }

  sortTypeStartDate(){
    this.taskTableList = this.taskTableList.sort( function (obj1: any, obj2: any) {
      if ( obj1.startdate < obj2.startdate ) {
        return -1;
      } else  if ( obj1.startdate > obj2.startdate) {
        return 1;
      } else { return 0; }
  });
  }

  sortTypeEndDate(){
    this.taskTableList = this.taskTableList.sort( function (obj1: any, obj2: any) {
      if ( obj1.enddate < obj2.enddate ) {
        return -1;
      } else  if ( obj1.enddate > obj2.enddate) {
        return 1;
      } else { return 0; }
  });
  }

  sortTypePriority() {
    this.taskTableList = this.taskTableList.sort( function (obj1: any, obj2: any) {
      return  (obj1.priority - obj2.priority);
    });  
  }  
  sortTypeStatusCompleted() {
    this.taskTableList = this.taskTableList.sort(function (obj1: any, obj2: any) {
      if ( obj1.status < obj2.status ) {
        return -1;
      } else  if ( obj1.status > obj2.status) {
        return 1;
      } else { return 0; }
    });
  }

  projSearch(){
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
              this.searchProjText = this.dialogSelectionProj.id.toString();
            }
          }
      );    

  }

}
