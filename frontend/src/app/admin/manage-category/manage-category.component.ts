import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { ThemePalette } from '@angular/material/core';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../../shared/global-constant';
import { CategoryComponent } from '../dialog/category/category.component';
import { response } from 'express';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.scss'
})
export class ManageCategoryComponent implements OnInit {

  displayedColumns: string[] = ['name', 'edit'];
  dataSource: any;
  responeMessage: any;


  constructor(private categoryService: CategoryService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    public themeService: ThemeService) { }



  ngOnInit(): void {
    // this ngxService is for loader of the page buffering
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.categoryService.getAllCategory().subscribe((response: any) => {
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);

    }, (error: any) => {
      this.ngxService.stop();
      console.log(error)
      if (error.error?.message) {
        this.responeMessage = error.error?.message;
      } else {
        this.responeMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responeMessage);
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const res = dialogRef.componentInstance.onAddCategory.subscribe(
      (response: any) => {
        this.tableData();
      })
  }

  handleEditAction(value: any) { 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data:value
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

    const res = dialogRef.componentInstance.onEditCategory.subscribe(
      (response: any) => {
        this.tableData();
      })
  }

}

