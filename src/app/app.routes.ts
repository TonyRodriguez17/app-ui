import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ConfigPageComponent } from './pages/config-page/config-page.component';
import { StrapperComponent } from './components/strapper/strapper.component';
import { EditpublicationComponent } from './pages/editpublication/editpublication.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'configuration', component: ConfigPageComponent, canActivate: [authGuard] },
    { path: 'create', component: StrapperComponent, canActivate: [authGuard] },
    { path: 'edit-publicacion/:slug', component: EditpublicationComponent, canActivate: [authGuard] }
];
