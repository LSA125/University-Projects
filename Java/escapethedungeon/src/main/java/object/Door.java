package object;
import java.awt.Graphics2D;

import Main.GamePanel;
import Main.Utility;
/*
 * Door class
 * Opens when all keys are collected
 */
public class Door extends Object{
    final int NUM_DOOR_FRAMES = 4;
    GamePanel gp;
    boolean isSolid = true;
    /*
     * Constructor for Door
     * @param tileX x coordinate
     * @param tileY y coordinate
     * @param gp gamePanel
     */
    public Door(int tileX, int tileY, GamePanel gp){
        super(tileX, tileY);
        isSolid = true;
        this.gp = gp;
        if(images == null){
            images = Utility.getImageSet("/Objects/Door/top", NUM_DOOR_FRAMES, Utility.TILE_SIZE);
        }
    }
    /*
     * Opens the door
     */
    public void open(){
        gp.playSound(3);
        isSolid = false;
    }
    /*
     * Collision method
     * goes to the next level
     */
    @Override
    public void collision(){
        //todo: open next level
        gp.playSound(5);
        gp.loadNextMap();
    }
    /*
     * Draws the door
     * @param g2d Graphics2D
     */
    @Override
    public void draw(Graphics2D g2d){
        if(isSolid){//if the door is closed, draw the first frame
            g2d.drawImage(images[0], tileX * Utility.TILE_SIZE, tileY * Utility.TILE_SIZE, null);
        }else if(curFrame >= NUM_DOOR_FRAMES-1){ //if the animation is done, draw the last frame
            g2d.drawImage(images[NUM_DOOR_FRAMES-1], tileX * Utility.TILE_SIZE, tileY * Utility.TILE_SIZE, null);
        }else{
            g2d.drawImage(animate(), tileX * Utility.TILE_SIZE, tileY * Utility.TILE_SIZE, null);
        }

    }
    @Override
    public boolean isSolid(){
        return isSolid;
    }
    @Override
    public boolean deleteOnCollision(){
        return false;
    }
}
