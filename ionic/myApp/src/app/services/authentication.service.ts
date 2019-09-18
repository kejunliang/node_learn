import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    console.log("111")
    return this.http.post<{token: string}>('/api/auth', {username: username, password: password})
      .pipe(
        map(result => { 
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }
}
