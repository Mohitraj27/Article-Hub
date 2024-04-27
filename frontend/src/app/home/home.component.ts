import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(public ThemeService:ThemeService){}

  changeTheme(color:any){
    this.ThemeService.setTheme(color);
  }
}
