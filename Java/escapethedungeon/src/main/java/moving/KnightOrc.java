package moving;

import Main.GamePanel;

public class KnightOrc extends Enemy{
    final int NUM_FRAMES = 6;
    public KnightOrc(int tileX, int tileY, GamePanel gp){
        super(tileX, tileY, gp);
    }
    @Override
    String getEnemyName() {
        return "KnightOrc";
    }
    @Override
    int getSpeed() {
        return 3;
    }
}
