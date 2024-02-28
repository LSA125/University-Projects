package object;

import Main.GamePanel;

public class Monster extends Trap{
    public Monster(int x, int y, GamePanel gp) {
        super(x, y, gp);
    }
    @Override
    String getType() {
        return "monster";
    }

    @Override
    int getNumFrames() {
        return 4;
    }

    @Override
    int getDamage() {
        return 1;
    }
}
