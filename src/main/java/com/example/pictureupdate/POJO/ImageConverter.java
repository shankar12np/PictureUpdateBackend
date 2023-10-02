package com.example.pictureupdate.POJO;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public class ImageConverter {
    public static void convertCR2ToJPEG(String cr2Path, String jpegPath) throws IOException {
        // Read the CR2 image
        BufferedImage bufferedImage = ImageIO.read(new File(cr2Path));
        // Write the BufferedImage to a JPEG file
        ImageIO.write(bufferedImage, "JPEG", new  File(jpegPath));
    }

    public static void main(String[] args) {
        try {
            convertCR2ToJPEG("path/to/your/input.CR2", "path/to/your/output.jpg");
        }catch (IOException e){
            e.printStackTrace();
        }
    }
}
