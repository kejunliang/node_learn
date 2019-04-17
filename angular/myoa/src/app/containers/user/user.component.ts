import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SortPropDir } from '@swimlane/ngx-datatable';
import { BehaviorSubject } from 'rxjs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  rows = [
    { name: 'Austin', gender: '男', company: 'Swimlane' },
    { name: 'Dany', gender: '男', company: 'KFC' },
    { name: 'Molly', gender: '女', company: 'Burger King' },
  ];
  columns = [
    { prop: 'name',name:"姓名" },
    { name: '性别' ,prop:"gender"},
    { name: '公司',prop:"company" }
  ];

  constructor() {}
  
  ngOnInit(): void {
   
  }

  
} 
