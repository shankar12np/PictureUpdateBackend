package com.example.pictureupdate.Repository;

import com.example.pictureupdate.Entity.ImageUpload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageUploadRepository extends JpaRepository<ImageUpload, Long> {
    ImageUpload findByFilename(String filename);
}
