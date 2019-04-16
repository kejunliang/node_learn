import { AfterViewInit,Component, OnInit } from '@angular/core';

declare const jsPlumb: any;
@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css']
})
export class FlowComponent implements AfterViewInit {
 
  
  title = '我的流程图';
  jsPlumbInstance;
  showConnectionToggle = false;
  
  ngAfterViewInit() {
    this.jsPlumbInstance = jsPlumb.getInstance();
    this.showConnectOnClick();
  
    
  }

  showConnectOnClick() {
    this.showConnectionToggle = ! this.showConnectionToggle;
    if ( this.showConnectionToggle) {
      this.jsPlumbInstance = jsPlumb.getInstance();
      this.connectSourceToTargetUsingJSPlumb();
    } else {
      this.jsPlumbInstance.reset();
    }
    
  }

  connectSourceToTargetUsingJSPlumb() {
    let labelName;
      labelName = 'connection';
      this.jsPlumbInstance.setContainer('diagramContainer')
      this.jsPlumbInstance.connect({
        source: 'item_left',
        target: 'item_right',
        endpoint: 'Rectangle'
      })
      this.jsPlumbInstance.draggable('item_left')
      this.jsPlumbInstance.draggable('item_right')

  }  
}
