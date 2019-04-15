import { Component, OnInit } from '@angular/core'; 
import { trigger, style, animate, transition } from '@angular/animations';
import { Router, NavigationEnd, ActivatedRoute, Data } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('200ms ease-in-out')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  name ="首页";
  title: string;
  primaryNav = true;
  user: "";
  childComponent: any;
  Account="账号";
  Profile="基础信息"
  Logout="退出"
  titleSubscription: "";
  userSubscription: "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  
  ) {
   
   
  }

  ngOnDestroy(): void {
   
  }

  switchNav(): void {
    this.primaryNav = !this.primaryNav;
  }

  logout(): void {
  
  }
  ngOnInit(){

  }
}
