package object;

import Main.GamePanel;
import Main.Utility;

import java.awt.Graphics2D;
/*
 * Trap class
 */
abstract public class Trap extends Object{
    GamePanel gp;
    boolean playAnimation = false;
    public Trap(int x, int y, GamePanel gp) {
        super(x, y);
        this.gp = gp;
        loadFrames();
        frameDelay = 5;
    }
    abstract String getType();
    abstract int getNumFrames();
    abstract int getDamage();
    private void loadFrames(){
        images = Utility.getImageSet("/Objects/Trap/" + getType(), getNumFrames(), Utility.TILE_SIZE);
    }
    public void collision(){
        if(!playAnimation){
            gp.score -= getDamage();
            if(gp.score < 0){
                gp.score = 0;
                gp.gameOver();
            }
            gp.playSound(8);
            playAnimation = true;
        }
    }

    public void draw(Graphics2D g2d){
        if(playAnimation){
            g2d.drawImage(animate(), tileX * Utility.TILE_SIZE, tileY * Utility.TILE_SIZE, null);
            //if animation played once, stop playing it
            if(curFrame == images.length-1){
                playAnimation = false;
                curFrame = 0;
            }
        }else{
            g2d.drawImage(images[0], tileX * Utility.TILE_SIZE, tileY * Utility.TILE_SIZE, null);
        }
    }

    @Override
    public boolean isSolid(){
        return false;
    }

    @Override
    public boolean deleteOnCollision(){
        return false;
    }
}