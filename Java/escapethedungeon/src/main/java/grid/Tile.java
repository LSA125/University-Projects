package grid;

import java.awt.image.BufferedImage;

public class Tile {
    public BufferedImage image;
    public boolean isSolid;
    Tile(boolean isSolid){
        this.isSolid = isSolid;
    }
    Tile(){
        this.isSolid = false;
    }
}
