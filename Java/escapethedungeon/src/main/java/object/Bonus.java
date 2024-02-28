package object;

import java.awt.Graphics2D;
import java.util.Random;

import Main.Utility;

public abstract class Bonus extends Object{
    final int SPAWN_RANGE_SECONDS = 20;
    final int TIME_TO_EXPIRE = 10;
    protected int curTicks = 0, ticksUntilExpire = Utility.FPS * TIME_TO_EXPIRE, ticksUntilSpawn;
    public boolean expired = false, spawned = false;
    /*
     * Constructor for Bonus
     * sets the ticksUntilSpawn to a random number between 0 and SPAWN_RANGE_SECONDS
     * @param tileX x coordinate of the tile
     * @param tileY y coordinate of the tile
     */
    public Bonus(int tileX, int tileY){
        super(tileX, tileY);
        ticksUntilSpawn = new Random().nextInt(Utility.FPS * SPAWN_RANGE_SECONDS);
    }
    /*
     * Updates the bonus
     * If the bonus has not spawned, it will wait until the ticksUntilSpawn has been reached
     * If the bonus has spawned, it will wait until the ticksUntilExpire has been reached
     * If the bonus has expired, it will set expired to true
     */
    public void update(){
        //wait until spawned and then begin expiration timer
        if(!spawned){
            if(curTicks >= ticksUntilSpawn){
                spawned = true;
                curTicks = 0;
            }else{
                curTicks++;
            }
        }else
        if(curTicks >= ticksUntilExpire){
            expired = true;
        }else{
            curTicks++;
        }
    }
    /*
     * Abstract method for the effect of the bonus
     */
    public abstract void effect();
    /*
     * Method for the collision of the bonus
     * If the bonus has not expired and has spawned, it will call the effect method
     */
    @Override
    public void collision(){
        if(!expired && spawned){
            effect();
            expired = true;
        }
    }
    /*
     * Draws the bonus
     * If the bonus has spawned and has not expired, it will draw the bonus
     * @param g2d Graphics2D object
     */
    @Override
    public void draw(Graphics2D g2d){
        if(spawned && !expired){
            g2d.drawImage(animate(), tileX * Utility.TILE_SIZE, tileY * Utility.TILE_SIZE, null);
        }
    }
}
