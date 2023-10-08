import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(private router: Router) {}

  logout() {
    // Clear user token from local storage (or other storage mechanism)
    localStorage.removeItem('token');

    // Optionally, clear other user-related data or perform additional logout tasks

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
