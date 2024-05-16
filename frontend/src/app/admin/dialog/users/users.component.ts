import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../services/snackbar.service';
import { ThemeService } from '../../../services/theme.service';
import { AppUserService } from '../../../services/app-user.service';
import { GlobalConstants } from '../../../shared/global-constant';
import { response } from 'express';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  onAddUser = new EventEmitter();
  onEditUser = new EventEmitter();
  usersForm: any = FormGroup;
  dialogAction: any = "Add";
  action: any = "Add";
  responeMessage: any;


  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UsersComponent>,
    private snackbarService: SnackbarService,
    public themeService: ThemeService,
    private appuserService: AppUserService,
  private ngxService:NgxUiLoaderService) { }


  ngOnInit(): void {
    this.dialogAction = this.dialogData.action;

    this.usersForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    if (this.dialogAction === 'Edit') {
      // this.dialogAction = "Edit";
      this.action = "Update";
      this.usersForm.patchValue(this.dialogData.data);
      this.usersForm.controls['password'].setValue('password');
    }
  }
handleSubmit(){
  if(this.dialogAction == 'Edit'){
    this.edit();
  }else{
    this.add();
  }
}

add(){
  this.ngxService.start()
  var formData= this.usersForm.value;
  var data = {
    email:formData.email,
    name:formData.name,
    password:formData.password
  }

  this.appuserService.addNewAppUser(data).subscribe((response:any)=>{
    this.ngxService.stop();
    this.dialogRef.close();
    this.onAddUser.emit();
    this.responeMessage=this.responeMessage;
    this.snackbarService.openSnackBar(this.responeMessage);

  },(error)=>{
    this.ngxService.stop();
      console.log(error);
      if (error.error?.message) {
        this.responeMessage = error.error?.message;

      }
      else {
        this.responeMessage = GlobalConstants.genericError;

      }
      this.snackbarService.openSnackBar(this.responeMessage);
  })
}

edit(){
  this.ngxService.start()
  var formData= this.usersForm.value;
  var data = {
    email:formData.email,
    name:formData.name,
    id:this.dialogData.data.id
  }

  this.appuserService.updateUser(data).subscribe((response:any)=>{
    this.ngxService.stop();
    this.dialogRef.close();
    this.onEditUser.emit();
    this.responeMessage=this.responeMessage;
    this.snackbarService.openSnackBar(this.responeMessage);

  },(error)=>{
    this.ngxService.stop();
      console.log(error);
      if (error.error?.message) {
        this.responeMessage = error.error?.message;

      }
      else {
        this.responeMessage = GlobalConstants.genericError;

      }
      this.snackbarService.openSnackBar(this.responeMessage);
  })
}

}
