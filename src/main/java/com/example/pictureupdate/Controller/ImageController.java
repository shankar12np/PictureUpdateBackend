package com.example.pictureupdate.Controller;

import com.example.pictureupdate.Entity.ImageUpload;
import com.example.pictureupdate.Service.ImageUploadService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/images")
@CrossOrigin(origins = "http://localhost:4200/")
public class ImageController {

    @Autowired
    private ImageUploadService imageUploadService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("imageDetails") String imageDetails) {
        ImageUpload uploadedImage = imageUploadService.convertAndStoreImage(file, imageDetails);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/images/")
                .path(uploadedImage.getId().toString())
                .toUriString();
        return ResponseEntity.ok().body(Collections.singletonMap("url", fileDownloadUri));
    }




    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        ImageUpload imageUpload = imageUploadService.findById(id);

        if (imageUpload == null) {
            return ResponseEntity.notFound().build();
        }

        Path filePath = Paths.get(imageUpload.getFilePath());
        try {
            byte[] data = Files.readAllBytes(filePath);
            MediaType contentType = determineImageType(filePath.toString());

            if (contentType == null) {
                return ResponseEntity.unprocessableEntity().build(); // Or another appropriate response status
            }
            return ResponseEntity.ok().contentType(contentType).body(data);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    private MediaType determineImageType(String filePath) {
        if (filePath == null) {
            // Log or print error message here
            System.out.println("Error: filePath is null.");
            return null;
        }

        String loweredFilePath = filePath.toLowerCase();

        if (loweredFilePath.endsWith(".png")) {
            return MediaType.IMAGE_PNG;
        } else if (loweredFilePath.endsWith(".jpeg") || loweredFilePath.endsWith(".jpg")) {
            return MediaType.IMAGE_JPEG;
        } else if (loweredFilePath.endsWith(".gif")) {
            return MediaType.IMAGE_GIF;
        } else if (loweredFilePath.endsWith(".cr2")){
            return MediaType.IMAGE_JPEG;
            // ... add other image types as needed
        }

        System.out.println("Error: Unrecognized file type for path: " + filePath);
        return null; // Or some default MediaType if you prefer
    }

    @GetMapping("/all")
    public ResponseEntity<List<ImageUpload>> getAllImages(){
        List<ImageUpload> allImages = imageUploadService.findAll();
        return ResponseEntity.ok(allImages);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable Long id){
        try {
            imageUploadService.deleteImage(id);
            return ResponseEntity.ok().body(Collections.singletonMap("status", "Image Deleted Successfully"));
        } catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("eooor",e.getMessage()));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("error","Failed to delete image"));
        }
    }


}
