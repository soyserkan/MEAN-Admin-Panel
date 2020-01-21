import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { PostsComponent } from '../../pages/posts/get-posts/posts.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'posts',      component: PostsComponent },
    { path: 'user',           component: UserComponent },
    { path: 'notifications',  component: NotificationsComponent }
];
