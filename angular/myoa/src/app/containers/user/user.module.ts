import { NgModule ,AfterViewInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
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
   data="测试";
   ngAfterViewInit() {
     this.data="测试" 
  }
   
}
