import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JwtDecodeResolve } from './resolve/jwt-decode.resolve';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: './login/login.module#LoginModule', canActivate: [NoAuthGuard] },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', resolve: {jwtDecode: JwtDecodeResolve}, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
