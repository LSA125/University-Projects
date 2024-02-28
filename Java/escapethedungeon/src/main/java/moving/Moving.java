package moving;

import java.awt.Rectangle;

public class Moving {
    public int x, y, speed;

    //x hitbox is offset on both sides, y is only offset off the top
    public Rectangle hitBox;
    public String direction;
    protected int prevX, prevY;
    protected int targetX, targetY;

    //animation variables
    protected int frameCounter, curFrame;
}
