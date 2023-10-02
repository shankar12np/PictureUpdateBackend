package com.example.pictureupdate.Service;

import com.example.pictureupdate.Config.UploadProperties;
import com.example.pictureupdate.Entity.ImageUpload;
import com.example.pictureupdate.POJO.ImageConverter;
import com.example.pictureupdate.POJO.ImageSRV;
import com.example.pictureupdate.Repository.ImageUploadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class ImageUploadService implements ImageSRV {
    @Autowired
    private ImageUploadRepository imageUploadRepository;


    @Override
    public ImageUpload saveImage(ImageUpload imageUpload) {
        return imageUploadRepository.save(imageUpload);
    }

    @Value("${upload.dir}")
    private final String uploadDirectory;

    public ImageUploadService(UploadProperties uploadProperties) {
        this.uploadDirectory = uploadProperties.getDir();
    }

    public ImageUpload convertAndStoreImage(MultipartFile file, String imageDetails) {  // <-- added imageDetails parameter
        try {
            String originalFilename = file.getOriginalFilename();
            String fileName = UUID.randomUUID() + "_" + originalFilename;
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".")).toLowerCase();

            Path filePath = Paths.get(uploadDirectory).resolve(fileName);
            file.transferTo(filePath);

            if (fileExtension.equals(".cr2")) {
                String jpegFilename = fileName.replace(".cr2", ".jpg");
                String jpegFilename2 = fileName.replace(".CR2",".jpg");
                Path jpgPath = Paths.get(uploadDirectory).resolve(jpegFilename);
                ImageConverter.convertCR2ToJPEG(filePath.toString(), jpgPath.toString());
                fileName = jpegFilename; // Update the fileName to jpeg since we converted it
                filePath = jpgPath;     // Update the filePath to point to the jpeg file
            }

            ImageUpload imageUpload = new ImageUpload();
            imageUpload.setFilename(fileName);
            imageUpload.setFilePath(filePath.toString());
            imageUpload.setImageDetails(imageDetails);  // <-- set image details here

            return saveImage(imageUpload); // Save the Image entity and return it

        } catch (IOException e) {
            throw new RuntimeException("Failed to store the file", e);
        }
    }

    public String getUploadDirectory() {
        return uploadDirectory;
    }

    public ImageUpload findById(Long id){
        return imageUploadRepository.findById(id).orElse(null);
    }

    public List<ImageUpload> findAll(){
        return imageUploadRepository.findAll();
    }


}

