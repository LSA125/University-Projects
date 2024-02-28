package moving;

import Main.GamePanel;

public class DOrc extends Enemy{
    final int NUM_FRAMES = 6;
    public DOrc(int tileX, int tileY, GamePanel gp){
        super(tileX, tileY, gp);
        speed = 2;
    }
    @Override
    String getEnemyName() {
        return "DOrc";
    }
    @Override
    int getSpeed() {
        return speed;
    }
}
