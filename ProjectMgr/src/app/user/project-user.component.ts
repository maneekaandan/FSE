import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {User} from "../model/users";
import {UserService} from "../service/user.service";
import { delay } from 'q';

@Component({
  selector: 'app-project-user',
  templateUrl: './project-user.component.html',
  styleUrls: ['./project-user.component.css']
})
export class ProjectUserComponent implements OnInit {
  private usersList: User[]; 
  private userCreate = new User();
  private userEdit = new User();
  firstname: string;
  lastname: string;
  empid: number;
  isEdit: boolean = false;
  buttonText: string = "Save";
  

  constructor(private userService: UserService) { 
    
  }

  ngOnInit() {
    this.loadUser();
    //this.maxid = this.usersList.length + 1;
  }

  sortTypeFirstName(){
    this.usersList = this.usersList.sort(function (obj1: User, obj2: User) {
      if ( obj1.firstname < obj2.firstname ) {
        return -1;
      } else  if ( obj1.firstname > obj2.firstname) {
        return 1;
      } else { return 0; }
    });
  }

  sortTypeLastName(){
    this.usersList = this.usersList.sort(function (obj1: User, obj2: User) {
      if ( obj1.lastname < obj2.lastname ) {
        return -1;
      } else  if ( obj1.lastname > obj2.lastname) {
        return 1;
      } else { return 0; }
    });
  }

  sortTypeEmpID(){
    this.usersList = this.usersList.sort(function (obj1: User, obj2: User) {
      return  (obj1.employeeid - obj2.employeeid);
    });
  }

  loadUser(): void {
    this.userService.getUsers()
    .subscribe( data => this.usersList = data);
  }

  editUser(user: User):void{
    
    if (!this.isEdit)
    {
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.empid = user.employeeid;
      this.userEdit = user;
      console.log(this.userEdit);
      this.isEdit = true;
      this.buttonText="Update";
    }

  }

  deleteUser(user: User):void {
    alert('Deleting...')
    console.log(user);
    this.userService.deleteUsers(user.userid)
      .subscribe(
        () => {
          console.log(`User Id = ${user.userid} has been deleted`);
          alert(`User Id = ${user.userid} has been deleted`);
          delay(2000);
          window.location.reload();
        },
        (err) => { console.log(err); }
      );
      
      //window.location.reload();
  }

  saveUser(userFrm: NgForm):void{
    
    

    if (this.isEdit){
      this.userEdit.firstname = userFrm.value.firstname;
      this.userEdit.lastname = userFrm.value.lastname;
      this.userEdit.employeeid = userFrm.value.empid*1;
      console.log(this.userEdit);
      this.userService.updateUsers(this.userEdit)
      .subscribe(() => {
        userFrm.reset();
      }, (error: any) => {console.log(error)}) ;
      this.isEdit = false;
      this.buttonText = "Save";
    }
    else
    {
      if (userFrm.value.firstname == undefined || userFrm.value.firstname == '')
      {
        console.log("FirstName is required");
        return;
      }
      
      if (userFrm.value.lastname == undefined || userFrm.value.lastname == '')
      {
        console.log("LastName is required");
        return;
      }

      if (userFrm.value.empid == undefined || userFrm.value.empid == '')
      {
        console.log("EmpID is required");
        return;
      }


    this.userCreate.employeeid = userFrm.value.empid*1;
    this.userCreate.firstname = userFrm.value.firstname;
    this.userCreate.lastname = userFrm.value.lastname;
    this.userCreate.userid = this.usersList.length + 1;
    this.userCreate.projectid = null;
    this.userCreate.taskid = null;
    this.userService.saveUsers(this.userCreate)
      .subscribe((data: User) => {
        console.log(data);
      }, (error: any) => { console.log(error); }
      );
    console.log(this.userCreate.userid);
    //console.log(userFrm.value);
    console.log('user saved');
    userFrm.reset();
    }
  }
}
