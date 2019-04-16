import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import {LoginComponent} from  './login/login.component';
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from './auth.guard';
import {  UserComponent } from "./containers/user/user.component";
import  { FlowComponent  } from "./flow/flow.component"
const routes: Routes = [
  { path: 'login', component: LoginComponent , canActivate: []},
   {
    path: '', 
    component: HomeComponent , 
    canActivate: [AuthGuard],
    children: [
        {
          path: 'user',
          component: UserComponent,
          data: {
            title: 'Users',
          }
        },
        {
          path: 'flow',
          component: FlowComponent,
        }
    ]
    
  },
  { path: '**', component:  HomeComponent, canActivate: [AuthGuard]},

    // otherwise redirect to home
 

    
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule { 
    
  
}
