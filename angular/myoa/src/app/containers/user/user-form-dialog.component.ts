import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component( { 
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.css']
})
export class UserFormDialogComponent implements OnInit {

 
  scenario: string;
  form: FormGroup;
  formValue: any;
 
  callback: Function | undefined;
  title:string;

  constructor(
    
   
   
  ) {
  
    
  }

  ngOnInit(): void {
    this.title="新建用户"
  }
    

  

  
}
