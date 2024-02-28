package Main;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
/*
 * Utility class for general purpose methods
 */
public class Utility {
    /*
     * gets a number of frames from a given path and scales them to the given tile size
     * path should look like "/Objects/Key/key"
     * this function will look for key0.png, key1.png, key2.png, etc.
     * @param path the path to the image set
     * @param numFrames the number of frames in the image set
     * @param tileSize the size to scale the images to
     */
    public static BufferedImage[] getImageSet(String path, int numFrames, int tileSize){
        BufferedImage[] imageSet = new BufferedImage[numFrames];
        try{
            for(int i = 0; i < numFrames; i++){
                imageSet[i] = preScaleImage(ImageIO.read(Utility.class.getResource(path + i + ".png")), tileSize, tileSize);
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return imageSet;
    }
    /*
     * Pre-scales an image to the given width and height
     */
    public static BufferedImage preScaleImage(BufferedImage image, int width, int height){
        BufferedImage newImage = new BufferedImage(width, height, image.getType());
        Graphics2D g = newImage.createGraphics();
        g.drawImage(image, 0, 0, width, height, null);
        g.dispose();
        return newImage;
    }

    private static final int originalTileSize = 16;
    private static final int scale = 2;
    public static final int TILE_SIZE = originalTileSize * scale;

    public static final int FPS = 60;
}
