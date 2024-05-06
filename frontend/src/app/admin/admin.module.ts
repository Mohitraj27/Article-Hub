import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpDetailsComponent } from './help-details/help-details.component';
import { LayoutComponent } from './layout/layout.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { MaterialModule } from '../shared/material-module';


@NgModule({
  declarations: [
    DashboardComponent,
    HelpDetailsComponent,
    LayoutComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
