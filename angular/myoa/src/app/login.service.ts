import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  getLogin():string{
     console.log("测试返回")
     this.http.get("/api/posts").subscribe(function (data) {
      console.log(data)
   })
       
     return "测试";
  }
}
