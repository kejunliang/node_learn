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
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,MatCardModule,BrowserAnimationsModule,MatButtonModule,MatInputModule,FormsModule,MatIconModule,
    AppRoutingModule,MatCheckboxModule,MatRadioModule,MatListModule,MatTreeModule,MatFormFieldModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
