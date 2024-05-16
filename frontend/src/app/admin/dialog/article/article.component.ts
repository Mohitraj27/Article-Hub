import { Component, Inject, OnInit , EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ThemeService } from '../../../services/theme.service';
import { CategoryService } from '../../../services/category.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { ArticleService } from '../../../services/article.service';
import { title } from 'process';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { response } from 'express';
import { GlobalConstants } from '../../../shared/global-constant';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit{

  onAddArticle = new EventEmitter();
  onEditArticle = new EventEmitter();
  articleForm:any=FormGroup;
  dialogAction:any="Add";
  action:any="Add";
  category:any;
  responeMessage:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  public themeService: ThemeService,
   private formBuilder:FormBuilder,
  private categoryService:CategoryService,
      public dialogRef:MatDialogRef<ArticleComponent>,
    private snackbarService:SnackbarService,
    private articleService:ArticleService,
  private ngxService:NgxUiLoaderService
  ) { }


   ngOnInit(): void {
       this.articleForm= this.formBuilder.group({
        title:[null,[Validators.required]],
        content:[null,[Validators.required]],
        categoryId:[null,[Validators.required]],
        status:[null,[Validators.required]]
       });
       if(this.dialogData.action === 'Edit'){
        this.dialogAction="Edit";
        this.action="Update";
        this.articleForm.patchValue(this.dialogData.data);
       }
       this.getAllCategory();
       this.ngxService.start();
   }

   getAllCategory(){
    this.categoryService.getAllCategory().subscribe((response:any)=>{
      this.category=this.category;
      this.ngxService.stop();
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message){
        this.responeMessage = error.error?.message;
      }
      else{
        this.responeMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responeMessage)
   
    })
   }

   handleSubmit(){
    if(this.dialogData === 'Edit'){
      this.edit();
    }
    else{
      this.add();
    }
   }


   add(){
    this.ngxService.start();
    var formData = this.articleForm.value;
    var data ={
      title:formData.title,
      content:formData.content,
      categoryId:formData.categoryId,
      status:formData.status

    }
    this.articleService.addNewArticle(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.onAddArticle.emit();
      this.responeMessage=response.message;
      this.snackbarService.openSnackBar(this.responeMessage);
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
    var formData = this.articleForm.value;
    var data ={
      id:this.dialogData.data.id,
      title:formData.title,
      content:formData.content,
      categoryId:formData.categoryId,
      status:formData.status

    }
    this.articleService.updateArticle(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.onEditArticle.emit();
      this.responeMessage=response.message;
      this.snackbarService.openSnackBar(this.responeMessage);
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
}

