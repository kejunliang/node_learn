import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { FormsModule } from '@angular/forms';

import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoListComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4000'],
        blacklistedRoutes: ['localhost:4000/api/auth']
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
