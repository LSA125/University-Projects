package grid;

import Main.GamePanel;
import javax.imageio.ImageIO;

import java.awt.Graphics2D;
import java.io.BufferedReader;
import java.io.IOException;

import java.io.InputStream;
import java.io.InputStreamReader;

import Main.Utility;

public class GridManager {
    GamePanel gp;
    Tile[] tiles;
    int map[][];
    final int NUM_TILE_TEXTURES = 4;

    public GridManager(GamePanel gp){
        this.gp = gp;
        tiles = new Tile[NUM_TILE_TEXTURES];

        map = new int[gp.maxScreenRow][gp.maxScreenCol];
        loadTiles();
    }

    public void loadTiles(){
        tiles[0] = loadTile("brick", true);

        tiles[1] = loadTile("floor", false);

        tiles[2] = loadTile("water", true);
        
        tiles[3] = loadTile("lava", true);
    }

    public Tile loadTile(String name, boolean isSolid){
        Tile tile = new Tile(isSolid);
        try{
            tile.image = Utility.preScaleImage(ImageIO.read(getClass().getResource("/Tiles/" + name + ".png")), Utility.TILE_SIZE, Utility.TILE_SIZE);
        }catch(IOException e){
            e.printStackTrace();
        }
        return tile;
    }

    public void loadMap(int mapNum){
        try{
            InputStream in = getClass().getResourceAsStream("/Maps/map" + mapNum + ".txt");
            BufferedReader br = new BufferedReader(new InputStreamReader(in));
            //get player position:
            String line = br.readLine();
            if(line == null){
                throw new IOException("No player position found in map" + mapNum + ".txt");
            }
            String[] playerPos = line.split(" ");
            if(playerPos[0].equals("playerstart") == false){
                throw new IOException("No player position found in map" + mapNum + ".txt");
            }
            gp.player.setPos(Integer.parseInt(playerPos[1]), Integer.parseInt(playerPos[2]));
            for(int i = 0; i < gp.maxScreenRow; i++){
                line = br.readLine();
                String[] tokens = null;
                if(line != null){
                    tokens = line.split(" ");
                }
                for(int j = 0; j < gp.maxScreenCol; j++){
                    if(tokens == null || j >= tokens.length){
                        map[i][j] = 0;//default tile
                    }else{
                        map[i][j] = Integer.parseInt(tokens[j]);
                    }
                }
            }
            br.close();
        }catch(IOException e){
            e.printStackTrace();
        }
    }

    public void draw(Graphics2D g2d){
        for(int i = 0; i < gp.maxScreenRow; i++){
            for(int j = 0; j < gp.maxScreenCol; j++){
                g2d.drawImage(tiles[map[i][j]].image, j * Utility.TILE_SIZE, i * Utility.TILE_SIZE, null);
            }
        }
    }

    public boolean isSolid(int x, int y) {

        return y < 0 || x < 0 || y >= gp.maxScreenRow || x >= gp.maxScreenCol || tiles[map[y][x]].isSolid;
    }
}
