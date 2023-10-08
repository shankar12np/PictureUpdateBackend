import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthServiceService} from "../auth-service.service";
import {Router} from "@angular/router";
import {User} from "../models/user";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
  registrationForm: FormGroup;
  user: User = { username: '', password: '' };

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.registrationForm.valid) {
      const user: User = this.registrationForm.value; // Convert the form value to User type
      this.authService.register(user).subscribe(
        (response) => {
          console.log('Registration successful:', response);

          // Redirect to the login page
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration error:', error);
        }
      );
    }
  }
}
