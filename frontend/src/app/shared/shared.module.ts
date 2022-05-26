import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedRoutingModule } from './shared-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { AdminRequestDialogComponent } from './dialog/admin-request-dialog/admin-request-dialog.component';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    PageNotFoundComponent,
    ChangePasswordComponent,
    AdminRequestDialogComponent,
    NotificationComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,

    // Material Imports
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogModule,
    MatListModule,

    SharedRoutingModule
  ]
})
export class SharedModule { }
