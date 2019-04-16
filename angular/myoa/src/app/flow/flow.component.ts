import { AfterViewInit,Component, OnInit } from '@angular/core';
declare const jsPlumb: any;
@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css']
})
export class FlowComponent implements AfterViewInit {

  title = 'Angular JsPlumb Integration';
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
      this.jsPlumbInstance.connect({
        connector: ['Flowchart', {stub: [212, 67], cornerRadius: 1, alwaysRespectStubs: true}],
        source: 'Source',
        target: 'Target1',
        anchor: ['Right', 'Left'],
        paintStyle: {stroke: '#456', strokeWidth: 4},
        overlays: [
          ['Label', {label: labelName, location: 0.5, cssClass: 'connectingConnectorLabel'}]
        ],
      });
  }  
}
