import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../../services/snackbar.service';
import { AppUserService } from '../../services/app-user.service';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { response } from 'express';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../../shared/global-constant';
import { UsersComponent } from '../dialog/users/users.component';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent implements OnInit{

  displayedColumns: string[] = ['name', 'email', 'status', 'edit'];
  dataSource: any;
  responeMessage: any;


  constructor(private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    private appuserService: AppUserService,
    public themeService: ThemeService
  ) { }


  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }
  
  refreshData(){
    this.tableData();
  }
  tableData() {
    this.appuserService.getAllAppuser().subscribe((response: any) => {
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);

    }, (error: any) => {
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


  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() { 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      action:'Add'
    };
    dialogConfig.width="850px";
    const dialogRef=this.dialog.open(UsersComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const res= dialogRef.componentInstance.onAddUser.subscribe(
      (res)=>{
        this.tableData();
      }
    )
  }

  handleEditAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      action:'Edit',
      data:values
    };
    dialogConfig.width="850px";
    const dialogRef=this.dialog.open(UsersComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const res= dialogRef.componentInstance.onEditUser.subscribe(
      (res)=>{
        this.tableData();
      }
    )
   }


  onChange(status: any, id: any) {
    this.ngxService.start();
    var data = {
      id: id,
      status: status.toString()
    }
    this.appuserService.updateUserStatus(data).subscribe((response: any) => {
      this.ngxService.stop();
      this.responeMessage = response?.message;
      this.snackbarService.openSnackBar(this.responeMessage)
     
      this.tableData(); // refresh table data after successfull
    }, (error: any) => {
      
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
