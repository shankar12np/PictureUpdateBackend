import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { User } from "./models/user";
import { AuthenticationResponse } from "./models/authentication-response";
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private readonly baseUrl: string = 'http://localhost:8080/login';
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + "/register", user);
  }

  authenticate(user: User): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.baseUrl + "/auth", user).pipe(
      tap(response => {
        console.log('Received token:', response.jwt);
        this.isLoggedInSubject.next(true); // Set the authentication status to true
      })
    );
  }

  logout() {
    // Clear the authentication status (e.g., remove the token)
    localStorage.removeItem('token');

    // Update the authentication status
    this.isLoggedInSubject.next(false);

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
