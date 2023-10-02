import { Component, OnInit } from '@angular/core';
import { PictureUpdateService } from '../picture-update.service';
import { ImageUpload } from '../models/image-upload.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  allImages: ImageUpload[] = [];

  constructor(private pictureUpdateService: PictureUpdateService) { }

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
  }

}
