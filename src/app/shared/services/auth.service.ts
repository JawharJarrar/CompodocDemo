import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient }  from '@angular/common/http';
import { Signup } from '../models/Signup.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:3000/auth/';

  constructor(private http: HttpClient) { }

  login(auth: Signup): Observable<Signup> {
     return this.http.post<Signup>(this.authUrl + 'login', auth);
  }

  register(auth: Signup) {
    this.http.post(this.authUrl + '/register', auth).subscribe();
    localStorage.setItem('token', 'fake register token');
  }

  logout() {
    localStorage.removeItem('token');
  }
  IsLoggedin() {
     const token = localStorage.getItem('token');
     if  (!token) {
       return false;
   }
   return true;
  }
}
