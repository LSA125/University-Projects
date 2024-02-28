package object;

import java.awt.Graphics2D;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import Main.GamePanel;
/*
 * ObjectManager manages all the objects in the game. It is responsible for loading objects from a file, updating them, and drawing them.
 */
public class ObjectManager {
    public Object[] objects;
    public Bonus[] bonuses;
    GamePanel gp;
    final int MAX_BONUSES = 5;
    final int MAX_OBJECTS = 15;
    public int numKeys;
    public Door mainDoor;
    private int numObjects = 0;
    private int numBonuses = 0;
    public ObjectManager(GamePanel gp){
        this.gp = gp;
    }

    public void loadObjects(int objNum){
        try{
            //reset door and keys
            mainDoor = null;
            numKeys = 0;
            //reset objects (hopefully java's garbage collector will take care of the rest)
            objects = new Object[MAX_OBJECTS];
            bonuses = new Bonus[MAX_BONUSES];
            numObjects = 0;
            numBonuses = 0;
            InputStream in = getClass().getResourceAsStream("/Maps/obj" + objNum + ".txt");
            BufferedReader br = new BufferedReader(new InputStreamReader(in));

            while(true){
                String line = br.readLine();
                if(line == null || numObjects >= MAX_OBJECTS){
                    break;
                }
                String[] tokens = line.split(" ");

                switch(tokens[0]){
                    case "key":
                        numKeys++;
                        numObjects++;
                        objects[numObjects] = new Key(Integer.parseInt(tokens[1]), Integer.parseInt(tokens[2]), gp);
                        break;
                    case "door":
                        numObjects++;
                        objects[numObjects] = new Door(Integer.parseInt(tokens[1]), Integer.parseInt(tokens[2]), gp);
                        mainDoor = (Door)objects[numObjects];
                        break;
                    case "spikes":
                        numObjects++;
                        objects[numObjects] = new Spikes(Integer.parseInt(tokens[1]), Integer.parseInt(tokens[2]), gp);
                        break;
                    case "monster":
                        numObjects++;
                        objects[numObjects] = new Monster(Integer.parseInt(tokens[1]), Integer.parseInt(tokens[2]), gp);
                        break;
                    case "speed":
                        numObjects++;
                        numObjects++;
                        objects[numObjects] = new Speed(Integer.parseInt(tokens[1]), Integer.parseInt(tokens[2]), gp);
                        bonuses[numBonuses] = (Speed)objects[numObjects];
                        break;
                    default:
                        break;
                } 
            }
            br.close();
        }catch(IOException e){
            e.printStackTrace();
        }
    }
    public boolean isSolid(int tileX, int tileY){
        for(int i = 0; i < objects.length; i++){
            if(objects[i] != null){
                if(objects[i].tileX == tileX && objects[i].tileY == tileY){
                    return objects[i].isSolid();
                }
            }
        }
        return false;
    }
    public void update(){
        //update bonuses
        for(int i = 0; i < bonuses.length; i++){
            if(bonuses[i] != null){
                bonuses[i].update();
                if(bonuses[i].expired){
                    numBonuses--;
                    bonuses[i] = null;
                }
            }
        }
    }
    public void collideWithObject(int tileX, int tileY){
        //currently a linear search, could be optimized via hashmap and pairs
        for(int i = 0; i < objects.length; i++){
            if(objects[i] != null){
                if(objects[i].tileX == tileX && objects[i].tileY == tileY){
                    objects[i].collision();
                    if(objects[i].deleteOnCollision()){
                        numObjects--;
                        objects[i] = null;
                    }
                }
            }
        }
    }
    public void draw(Graphics2D g2d){
        for(int i = 0; i < objects.length; i++){
            if(objects[i] != null)
                objects[i].draw(g2d);
        }
    }
}
