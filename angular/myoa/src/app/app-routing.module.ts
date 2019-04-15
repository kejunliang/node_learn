import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from  './login/login.component';
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from './auth.guard';
import {  UserComponent } from "./containers/user/user.component";
const routes: Routes = [
  { path: 'login', component: LoginComponent , canActivate: []},
  {
    path: 'home', 
    component: HomeComponent , 
    canActivate: [AuthGuard],
    children: [
        {
          path: 'user',
          component: UserComponent,
          data: {
            title: 'Users',
          }
        }
    ]
    
  },
    // otherwise redirect to home
  { path: '**', component:  HomeComponent, canActivate: [AuthGuard]}
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})

export class AppRoutingModule { 
    
  
}
