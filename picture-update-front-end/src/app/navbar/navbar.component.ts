import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthServiceService} from "../auth-service.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLoggedIn!: boolean;
  constructor(private router: Router, private authService: AuthServiceService) {
  }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }


  logout() {
this.authService.logout()

  }
}
