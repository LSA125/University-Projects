package object;

import Main.GamePanel;

public class Spikes extends Trap{
    public Spikes(int x, int y, GamePanel gp) {
        super(x, y, gp);
    }
    @Override
    String getType() {
        return "Spikes";
    }

    @Override
    int getNumFrames() {
        return 5;
    }

    @Override
    int getDamage() {
        return 1;
    }
}
