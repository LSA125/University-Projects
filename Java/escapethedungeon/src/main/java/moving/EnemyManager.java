package moving;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import Main.GamePanel;

public class EnemyManager {
    Enemy[] enemies;
    final int MAX_ENEMIES = 10;
    GamePanel gp;
    public EnemyManager(GamePanel gp){
        enemies = new Enemy[MAX_ENEMIES];
        this.gp = gp;
    }
    public void loadEnemies(int enemyNum){
        try{
            InputStream in = getClass().getResourceAsStream("/Maps/enemies" + enemyNum + ".txt");
            BufferedReader br = new BufferedReader(new InputStreamReader(in));
            int i = 0;
            while(true){
                String line = br.readLine();
                if(line == null || i >= MAX_ENEMIES){
                    break;
                }
                String[] tokens = line.split(" ");
                switch(tokens[0]){
                    case "DOrc":
                        enemies[i++] = new DOrc(Integer.parseInt(tokens[1]), Integer.parseInt(tokens[2]),gp);
                        break;
                    case "KnightOrc":
                        enemies[i++] = new KnightOrc(Integer.parseInt(tokens[1]), Integer.parseInt(tokens[2]),gp);
                        break;
                }
            }
            br.close();
        }catch(IOException e){
            e.printStackTrace();
        }
    }
    public boolean isOccupied(int tileX, int tileY){
        for(Enemy e : enemies){
            if(e != null){
                if(e.targetX == tileX && e.targetY == tileY){
                    return true;
                }
            }
        }
        return false;
    }
    public void update(){
        for(Enemy e : enemies){
            if(e != null){
                e.update();
            }
        }
    }
    public void draw(java.awt.Graphics2D g){
        for(Enemy e : enemies){
            if(e != null){
                e.draw(g);
            }
        }
    }
}
