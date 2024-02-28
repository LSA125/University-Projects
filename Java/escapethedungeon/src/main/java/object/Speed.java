package object;

import Main.GamePanel;
import Main.Utility;
/*
 * Speed class
 * Increases the speed of the player when picked up
 */
public class Speed extends Bonus{
    GamePanel gp;
    final float SPEED_BONUS = 2.0f;
    final int SPEED_BONUS_DURATION = Utility.FPS * 5;
    public Speed(int tileX, int tileY, GamePanel gp){
        super(tileX, tileY);
        images = Utility.getImageSet("/Objects/Bonus/Speed/", 4, Utility.TILE_SIZE);
        this.gp = gp;
    }
    /*
     * Increases the score and speed of the player
     */
    @Override
    public void effect() {
        gp.score += 2;
        gp.player.buffSpeed(SPEED_BONUS, SPEED_BONUS_DURATION);
    }

    @Override
    public boolean isSolid() {
        return false;
    }

    @Override
    public boolean deleteOnCollision() {
        return false;
    }
}