import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todo$: Observable<Todo[]>;
  constructor(private todos: TodoService) { }

  ngOnInit() {
    console.log("获取待办")
    console.log(this.todos.getTodos());
    this.todo$ = this.todos.getTodos();
    console.log(this.todo$)
  }

}
