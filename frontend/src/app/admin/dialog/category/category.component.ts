import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {EventEmitter} from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { DialogRef } from '@angular/cdk/dialog';
import { SnackbarService } from '../../../services/snackbar.service';
import { ThemePalette } from '@angular/material/core';
import { ThemeService } from '../../../services/theme.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../../../shared/global-constant';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {

  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm: any = FormGroup;
  dialogAction: any = "Add";
  action: any = "Add";
  responeMessage: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef:MatDialogRef<CategoryComponent>,
    private snackbarService:SnackbarService,
    public themeService:ThemeService,
    private ngxService:NgxUiLoaderService
  ) { }

  ngOnInit(): void {
   this.categoryForm=this.formBuilder.group({
    name:[null,[Validators.required]]
   });
   if(this.dialogData.action === 'Edit'){
    this.dialogAction = "Edit";
    this.action = "Update";
    this.categoryForm.patchValue(this.dialogData.data);
   }
  }

  handleSubmit(){
    if(this.dialogAction == "Edit"){
     this.edit();
    } else{
      this.add();
    }
  }

  add(){
    this.ngxService.start();
    var formData = this.categoryForm.value;
    var data ={
      name:formData.name
    }
    this.categoryService.addNewCategory(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.onAddCategory.emit();
      this.responeMessage=response.message;
      this.snackbarService.openSnackBar();
    }),(error:any)=>{
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message){
        this.responeMessage = error.error?.message;
      }
      else{
        this.responeMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responeMessage)
    }
  }
  
  edit(){
    this.ngxService.start();
    var formData = this.categoryForm.value;
    var data ={
     id:this.dialogData.data.id,
     name:formData.name
    }
    this.categoryService.updateCategory(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.onEditCategory.emit();
      this.responeMessage=response.message;
      this.snackbarService.openSnackBar();
    }),(error:any)=>{
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message){
        this.responeMessage = error.error?.message;
      }
      else{
        this.responeMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responeMessage)
    }}
}
