import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpDetailsComponent } from './help-details/help-details.component';
import { LayoutComponent } from './layout/layout.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { MaterialModule } from '../shared/material-module';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UsersComponent } from './dialog/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { CategoryComponent } from './dialog/category/category.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HelpDetailsComponent,
    LayoutComponent,
    ConfirmationComponent,
    ManageUsersComponent,
    UsersComponent,
    ManageCategoryComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class AdminModule { }
