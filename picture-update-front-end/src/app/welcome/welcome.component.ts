import { Component, OnInit } from '@angular/core';
import { PictureUpdateService } from '../picture-update.service';
import { ImageUpload } from '../models/image-upload.model';
import {Router} from "@angular/router";
import {AuthServiceService} from "../auth-service.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  allImages: ImageUpload[] = [];
  isLoggedIn!: boolean;


  constructor(private pictureUpdateService: PictureUpdateService, private router: Router, private authService: AuthServiceService) { }

  ngOnInit() {
    this.pictureUpdateService.getAllImages().subscribe(
      images => {
        console.log('Received images:', images);
        this.allImages = images;
      },
      error => {
        console.error('Error fetching all images:', error);
      }
    );

    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  // Define the logout method
  logout() {
this.authService.logout()
  }


  deleteImage(id: number | undefined) {
    if (id === undefined) {
      console.error('Image ID is undefined');
      return;
    }

    if (confirm('Are you sure you want to delete this image?')) {
      this.pictureUpdateService.deleteImage(id).subscribe(
        () => {
          // On successful deletion, remove the image from the allImages array
          this.allImages = this.allImages.filter(image => image.id !== id);
        },
        error => {
          // Handle any errors here. Maybe display an error message to the user.
          console.error('Error deleting the image:', error);
        }
      );
    }
  }

}
