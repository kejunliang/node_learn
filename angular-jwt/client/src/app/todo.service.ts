import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:HttpClient) { }

  getTodos() {
    console.log("获取待办")
    this.http.get<Todo[]>('/api/todos').subscribe(function(data){
      console.log(data)
        })
    return this.http.get<Todo[]>('/api/todos');
  }

  getTodo(id: number) {
    console.log("获取待办按照")
    return this.http.get<Todo>(`/api/todos/${id}`);
  }
}
