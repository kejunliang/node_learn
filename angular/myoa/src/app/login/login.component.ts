import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service'
@Component({ 
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  hide = true;
  constructor(private LoginService: LoginService) {
  }
  name=""
  password=""
  flag=false;
  gohome(): void{
    console.log("点击");
    const data=this.LoginService.getLogin();
    console.log(data);

  }
  

  ngOnInit() {
  }

}
