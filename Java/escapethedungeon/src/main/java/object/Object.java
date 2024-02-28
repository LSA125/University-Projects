package object;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
/*
 * Abstract class for all Interactive Objects in the game
 * Contains the x and y position of the object
 * Contains a boolean to check if the object is solid
 * Contains a boolean to check if the object should be deleted on collision
 * Contains a frame counter, current frame, and frame delay for animation
 * Contains an array of images for animation
 */
public abstract class Object {
    public int tileX, tileY, index;
    protected int frameCounter = 0, curFrame = 0, frameDelay = 10;
    protected BufferedImage[] images = null;
    /*
     * @param tileX the x position of the object
     * @param tileY the y position of the object
     */
    public Object(int tileX, int tileY){
        this.tileX = tileX;
        this.tileY = tileY;
    }
    /*
     * Method to animate the object
     */
    protected BufferedImage animate(){
        if(frameCounter >= frameDelay){
            curFrame++;
            if(curFrame >= images.length){
                curFrame = 0;
            }
            frameCounter = 0;
        }else{
            frameCounter++;
        }
        return images[curFrame];
    }
    /*
     * Abstract method to draw the object
     */
    public abstract void draw(Graphics2D g);

    /*
     * Abstract method for player collision
     */
    public abstract void collision();

    /*
     * Abstract method to check if the object is solid
     */
    abstract public boolean isSolid();

    /*
     * Abstract method to check if the object should be deleted on collision
     */
    abstract public boolean deleteOnCollision();
}
