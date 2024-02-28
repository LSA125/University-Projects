package object;

import Main.GamePanel;
import java.awt.Graphics2D;

import Main.Utility;
/*
 * Key class
 */
public class Key extends Object{
    GamePanel gp;
    /*
     * Constructor for Key
     * @param tileX x coordinate
     * @param tileY y coordinate
     * @param gamePanel gamePanel
     */
    public Key(int tileX, int tileY, GamePanel gamePanel){
        super(tileX, tileY);
        this.gp = gamePanel;
        if(images == null){
            final int NUM_KEY_FRAMES = 4;
            images = Utility.getImageSet("/Objects/Key/key", NUM_KEY_FRAMES, Utility.TILE_SIZE);
        }
    }
    /*
     * Collision method
     * Decreases the number of keys and increases the score
     */
    @Override
    public void collision(){
        gp.playSound(2);
        gp.objectManager.numKeys--;
        gp.score++;
        if(gp.objectManager.numKeys == 0){
            gp.objectManager.mainDoor.open();
        }
    }
    /*
     * Draws the key
     * @param g2d Graphics2D
     */
    @Override
    public void draw(Graphics2D g2d){
        g2d.drawImage(animate(), tileX * Utility.TILE_SIZE, tileY * Utility.TILE_SIZE, null);
    }

    @Override
    public boolean isSolid(){
        return false;
    }

    @Override
    public boolean deleteOnCollision(){
        return true;
    }
}
