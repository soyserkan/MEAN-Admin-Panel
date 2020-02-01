import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';




import {
  MatTableModule, MatFormFieldModule, MatPaginatorModule,
  MatSortModule, MatInputModule, MatButtonModule, MatIconModule,
  MatDialogModule, MatRadioModule, MatSelectModule, MatCheckboxModule, MatChipsModule,MatToolbarModule,MatProgressSpinnerModule, MatCardModule
} from '@angular/material';



import { PostsComponent } from '../../pages/posts/get-posts/posts.component';

import { NewPostsComponent } from 'app/pages/posts/new-post/new-posts.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    NotificationsComponent,
    PostsComponent,
    NewPostsComponent
  ],
  providers: [],
  entryComponents: [NewPostsComponent],
})

export class AdminLayoutModule { }
