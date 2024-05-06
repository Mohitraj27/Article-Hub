import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { response } from 'express';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  constructor(private dialog:MatDialog,
    private router:Router,
    public themeService:ThemeService
  ){}

  logout(){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.data={
      message:'Logout'
    };
    const dialogRef= this.dialog.open(ConfirmationComponent,dialogConfig);
    const response = dialogRef.componentInstance.onEmitStatusChange.subscribe((response:any)=>{
      dialogRef.close();
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    })
  }

  changeTheme(color:any){
    this.themeService.setTheme(color);
  }
}
