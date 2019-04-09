import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from  './login/login.component';
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: 'login', component: LoginComponent , canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})

export class AppRoutingModule { 
    
  
}
