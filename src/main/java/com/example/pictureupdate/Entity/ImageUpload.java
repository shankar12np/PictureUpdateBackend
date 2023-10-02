package com.example.pictureupdate.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Pictures")
public class ImageUpload {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    Long id;
    String imageDetails;
    String filePath;
    String filename;
}
