import {Component, OnInit} from '@angular/core';
import {PictureUpdateService} from "../picture-update.service";
import {ImageUpload} from "../models/image-upload.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-picture-update',
  templateUrl: './picture-update.component.html',
  styleUrls: ['./picture-update.component.css']
})
export class PictureUpdateComponent implements OnInit {

  allImages: ImageUpload[] = [];

  selectedFile: File | null = null;
  imageDetails: string = '';

  constructor(private pictureUpdateService: PictureUpdateService, private router: Router) {
  }

  ngOnInit() {
    this.pictureUpdateService.getAllImages().subscribe(
      images => {
        this.allImages = images;
      },
      error => {
        console.error('Error fetching all images: ', error);
      }
    )
  }

  imageUpload: ImageUpload = new ImageUpload();

  // @ts-ignore
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.imageUpload.filename = this.selectedFile.name;
    console.log('Selected file: ', this.selectedFile);

  }

  onSubmit() {
    // Validate file and image details
    if (!this.selectedFile) {
      console.error('File not selected.');
      alert('Please select a file before submitting.');
      return;
    }

    if (!this.imageDetails) {
      console.error('Image details not provided.');
      alert('Please provide image details before submitting.');
      return;
    }

    // If both file and details are present, proceed with the upload
    this.imageUpload.imageDetails = this.imageDetails;
    this.pictureUpdateService.uploadImage(this.selectedFile, this.imageUpload).subscribe(
      response => {
        console.log('Upload successful:', response);
        alert('Image uploaded successfully!');
        this.router.navigate(['/welcome']);


      })
  }

  deleteImage(imageId: number) {
    // Confirm with the user
    if (confirm('Are you sure you want to delete this image?')) {
      // Call your service to delete the image
      this.pictureUpdateService.deleteImage(imageId).subscribe(response => {
        // If success, remove the image from the array
        this.allImages = this.allImages.filter(image => image.id !== imageId);
        // You can show a success message here if you want
      }, error => {
        // Handle errors here, e.g. show an error message
        console.error("Error deleting image:", error);
      });
    }
  }


}
