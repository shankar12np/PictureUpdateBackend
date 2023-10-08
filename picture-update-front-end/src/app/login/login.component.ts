import { Component } from '@angular/core';
import {User} from "../models/user";
import {AuthServiceService} from "../auth-service.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User('', '');

  constructor(private authService: AuthServiceService, private router: Router) {
  }

  onSubmit() {
    this.authService.authenticate(this.user).subscribe({
      next: (response) => {
        // handle success
        localStorage.setItem('token', response.jwt);
        this.router.navigate(['/welcome']);
      },
      error: (error) => {
        // handle error
        console.error('Authentication error', error);
      },
      complete: () => {
        // handle completion, if needed
      }
    });
  }
    navigateToRegister() {
      this.router.navigate(['/register']); // Navigate to the registration page
    }
}
