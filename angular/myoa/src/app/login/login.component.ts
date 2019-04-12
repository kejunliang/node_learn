import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';
@Component({ 
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
 
  public username: string;
  public password: string;
  public error: string;
  hide = true;
  constructor(private auth: AuthService, private router: Router) { }
  public submit() {
    console.log(this.username)
    this.auth.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['home']),
        err => this.error = 'Could not authenticate'
      );

  }
  ngOnInit() {
  
  }

}
