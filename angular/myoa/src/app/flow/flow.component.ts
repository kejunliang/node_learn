import { AfterViewInit,Component, OnInit } from '@angular/core';
declare var $ : any;
import { DndDropEvent } from 'ngx-drag-drop';  
declare const jsPlumb: any;
import { DragDropModule } from "@angular/cdk/drag-drop";
@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.css']
})
export class FlowComponent implements AfterViewInit {
 
  
  title = '我的流程图';
  jsPlumbInstance;
 
  ngAfterViewInit() {
    this.jsPlumbInstance = jsPlumb.getInstance();
    this.connectSourceToTargetUsingJSPlumb();
    
  }
  connectSourceToTargetUsingJSPlumb() {
     
     
      let  that=this
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
       var i=0
       // 鼠标悬浮在连接线上的样式
			var connectorHoverStyle = {
				lineWidth: 4,
				strokeStyle: "#216477",
				outlineWidth: 2,
				outlineColor: "white"
			};
       //基本连接线样式
			var connectorPaintStyle = {
				lineWidth: 4,
				strokeStyle: "#61B7CF",
				joinstyle: "round",
				outlineColor: "white",
				outlineWidth: 2
			};
       var hollowCircle = {
				endpoint: ["Dot", { radius: 8 }],  //端点的形状
				connectorStyle: connectorPaintStyle,//连接线的颜色，大小样式
				connectorHoverStyle: connectorHoverStyle,
				paintStyle: {
					strokeStyle: "#1e8151",
					fillStyle: "transparent",
					radius: 2,
					lineWidth: 2
				},		//端点的颜色样式
				//anchor: "AutoDefault",
				isSource: true,	//是否可以拖动（作为连线起点）
				connector: ["Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],  //连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
				isTarget: true,	//是否可以放置（连线终点）
				maxConnections: -1,	// 设置连接点最多可以连接几条线
				connectorOverlays: [["Arrow", { width: 10, length: 10, location: 1 }]]
      };
      var common = {
        isSource: true,
        isTarget: true,
      }
       ///默认重新画之前先重置，处理单一页面路由切换重复的bug
      setTimeout(function(){jsPlumb.reset()},100) 
      $("#left").children().draggable({
          helper: "clone",
          scope: "ss",
      });
      $("#right").droppable({
				scope: "ss",
				drop: function (event, ui) {
					var left = ui.offset.left - $(this).offset().left;
					var top = ui.offset.top - $(this).offset().top;
          var name = ui.draggable[0].id;
          console.log(name)
					switch (name) {
           
						case "node1":
              i++;
              console.log(i)
              var id = "state_start" + i;
              console.log(id)
              console.log($(ui.helper).html())
              console.log(left)
              console.log(top)
							$(this).append('<div class="node"  style="position:absolute;border-radius: 25em"  id="' + id + '" >' + $(ui.helper).html() + '</div>');
              $("#" + id).css("left", left).css("top", top);
              jsPlumb.setContainer('right')  
              jsPlumb.addEndpoint(id, { anchors: "Right" },common);
              jsPlumb.draggable(id);				
							break;
              case "node2":
							i++;
							id = "state_flow" + i;
							$(this).append("<div class='node' id='" + id + "'>" + $(ui.helper).html() + "</div>");
							$("#" + id).css("left", left).css("top", top);
              jsPlumb.addEndpoint(id, { anchors: "Left" },common);
              jsPlumb.addEndpoint(id, { anchors: "Right" },common);
              jsPlumb.draggable(id);
              doubleclick("#" + id);
							break;
						case "node3":
							i++;
							id = "state_decide" + i;
							$(this).append("<div class='node' id='" + id + "'>" + $(ui.helper).html() + "</div>");
							$("#" + id).css("left", left).css("top", top);
              jsPlumb.addEndpoint(id, { anchors: "Left" },common);
              jsPlumb.addEndpoint(id, { anchors: "Right" },common);
							jsPlumb.draggable(id);
							break;
						case "node4":
							i++;
							id = "state_end" + i;
							$(this).append('<div class="node" style="border-radius: 25em"  id="' + id + '" >' + $(ui.helper).html() + '</div>');
							$("#" + id).css("left", left).css("top", top);
              jsPlumb.addEndpoint(id, { anchors: "Left" },common);
							jsPlumb.draggable(id);
							break;
					}
				}
			});
      

      function doubleclick(id) {
        $(id).dblclick(function () {
          var text = $(this).text();
          $(this).html("");
          $(this).append("<input type='text' value='" + text + "' />");
          $(this).mouseleave(function () {
            $(this).html($("input[type='text']").val());
          });
        });
      }
  
  }
  
  

 
}
