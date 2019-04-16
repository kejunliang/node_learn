import { NgModule ,AfterViewInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user.component';



@NgModule({
  imports: [
    CommonModule   
  ],
  declarations: [ 
    UserComponent,
   
  ],
  entryComponents: [
    
  ],
})
export class UserModule  implements AfterViewInit{ 

  ngAfterViewInit() {
  
  }
   
}
