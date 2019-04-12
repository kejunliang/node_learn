import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MatCardModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule  } from "@angular/material/checkbox";
import {MatRadioModule} from '@angular/material/radio';
import { MatListModule } from "@angular/material/list";
import { MatTreeModule } from "@angular/material/tree";
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule }    from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { MatSidenavModule,MatMenuModule,MatToolbarModule } from "@angular/material";
import {  UserComponent } from "./containers/user/user.component";
import { JwtModule } from '@auth0/angular-jwt'; 
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { NavModule } from './nav/nav.module';
import { FlexLayoutModule } from '@angular/flex-layout';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,MatCardModule,BrowserAnimationsModule,MatButtonModule,MatInputModule,FormsModule,MatIconModule,
    AppRoutingModule,MatCheckboxModule,MatRadioModule,MatListModule,MatTreeModule,MatFormFieldModule,HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['localhost:3000/api/signin/auth']
      }
    }),
    MatSidenavModule,
    NavModule,
    MatMenuModule,
    MatToolbarModule,
    FlexLayoutModule
  ],
  providers: [
    AuthService, 
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
