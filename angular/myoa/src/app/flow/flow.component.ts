import { Component, OnInit } from '@angular/core';
declare const jsPlumb: any;
@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css']
})
export class FlowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var common = {
      isSource:true,
      isTarget:true,
      connector: ['Bezier'],
      //paintStyle: { stroke: 'lightgray', strokeWidth: 3 },//空的锚点风格
      endpointStyle: { fill: 'lightgray', outlineStroke: 'darkgray', outlineWidth: 2 }
     
    }

    console.log("进来了");
    jsPlumb.ready(function () {
        //添加节点
		   jsPlumb.addEndpoint('item_left',{achors:['Right']},common)
		   jsPlumb.addEndpoint('item_right',{achors:['Left']},common)
	       	
          
       	jsPlumb.draggable('item_left', {
			  containment: 'parent',
			  grid: [10, 10]
			})
       	  
      jsPlumb.draggable('item_right')
           
            // 单点击了连接线, 似乎不怎么好用
			jsPlumb.bind('click', function (conn, originalEvent) {
			  if (confirm('确定删除所点击的链接吗？')) {
			    jsPlumb.detach(conn)
			  }
			})

    })
  }

}
