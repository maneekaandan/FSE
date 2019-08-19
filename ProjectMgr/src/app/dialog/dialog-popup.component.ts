import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material/dialog";
import { FormGroup } from '@angular/forms';
import { DialogData } from '../model/DialogData';
import {User} from "../model/users";
import {UserService} from "../service/user.service";
import { ProjectService } from '../service/project.service';
import { Project } from '../model/project';
import { ParentTaskService } from '../service/parenttask.service';
import { ParentTask } from '../model/parenttask';

@Component({
  selector: 'app-dialog-popup',
  templateUrl: './dialog-popup.component.html',
  styleUrls: ['./dialog-popup.component.css']
})
export class DialogPopupComponent implements OnInit {

  form: FormGroup;
  description:string;
  private usersList: User[]; 
  private projList: Project[];
  private selectList: DialogData[] = [] ;
  selectedId: number;
  private parentTaskList: ParentTask[];  

  constructor(private dialogRef: MatDialogRef<DialogPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data : DialogData,
    private userService: UserService,
    private projectService: ProjectService,
    private parentTaskService: ParentTaskService
    ) {
      this.description = data.title;
      console.log(this.description);
      this.selectedId = 1;
   }

  ngOnInit() {
    if (this.description == 'uname')
     { this.loadUser(); }
    if (this.description == 'projname')
    { this.loadProj(); }
    if (this.description == 'parenttask')
    { this.loadParentTask(); }
  }

  loadParentTask(): void{

    this.parentTaskService.getParentTask()
      .subscribe(data => {
        this.parentTaskList = data;
        this.parserParentTask();
      });
  }

  loadProj(): void{
    this.projectService.getProject()
      .subscribe(data => { 
          this.projList = data;
          this.parserProj();
          
      });
  }

  loadUser(): void {
    this.userService.getUsers()
    .subscribe( data => { this.usersList = data; 
      this.parser();
    });
  }

  parserParentTask(){
    
    for(var i=0;i< this.parentTaskList.length; i++){
      let tmp = new DialogData();

      tmp.id = this.parentTaskList[i].parentid;
      tmp.title = this.parentTaskList[i].parenttaskdesc + " (" + tmp.id.toString() + ")";
      this.selectList.push({id: tmp.id, title: tmp.title});
      

    }
  }

  parserProj(){
    
    for(var i=0;i< this.projList.length; i++){
      let tmp = new DialogData();

      tmp.id = this.projList[i].projectid;
      tmp.title = this.projList[i].projectdesc + " (" + tmp.id.toString() + ")";
      this.selectList.push({id: tmp.id, title: tmp.title});
      

    }
  }

  parser(){
    //this.selectList = null;
    for(var i=0; i < this.usersList.length; i++)
    {
      let tmp = new DialogData();
      
      tmp.id = this.usersList[i].userid*1;
      tmp.title = this.usersList[i].firstname + ' ' + this.usersList[i].lastname + ' (' + this.usersList[i].userid.toString() + ') ';
      this.selectList.push({id: tmp.id, title: tmp.title});
      //console.log(this.selectList);
    }
  }

  save() {
 

    let tmp = this.selectList.find( x => x.id == this.selectedId);
    console.log(tmp);
    
    this.dialogRef.close(tmp);
}

close() {
    this.dialogRef.close();
}

}
