package Main;
import grid.GridManager;
import javax.swing.JPanel;

import moving.Player;
import object.ObjectManager;
import moving.EnemyManager;

import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Color;

import java.awt.Graphics2D;
/**
 * The GamePanel class represents the main panel of the game where the game is played.
 * It extends JPanel and implements Runnable.
 */
public class GamePanel extends JPanel implements Runnable{

    private final int tileSize = Utility.TILE_SIZE;

    public final int maxScreenCol = 30;
    public final int maxScreenRow = 20;
    final int screenWidth = maxScreenCol * tileSize;
    final int screenHeight = maxScreenRow * tileSize;
    public final GridManager gridManager = new GridManager(this);
    public final ObjectManager objectManager = new ObjectManager(this);
    public final EnemyManager enemyManager = new EnemyManager(this);
    public final Sound soundEffects = new Sound();
    public final Sound music = new Sound();
    public final UI ui = new UI(this);
    public Object[] objects;
    Thread gameThread;
    KeyHandler keyHandler;
    public Player player;

    public int currentMap;
    public final int NUM_MAPS = 2;

    public boolean paused = false;
    public int gameStartTime;

    public int getTime(){
        return (int)(System.currentTimeMillis() - gameStartTime) / 1000;
    }
    public int score = 0;
    /**
     * The GamePanel class represents the main panel of the game.
     * It is responsible for initializing the player, setting the panel's size and background color,
     * enabling double buffering, and handling key events.
     *
     * @param keyHandler The KeyHandler object used to handle key events.
     */
    public GamePanel(KeyHandler keyHandler) {
        this.keyHandler = keyHandler;
        player = new Player(this, this.keyHandler);
        this.setPreferredSize(new Dimension(screenWidth, screenHeight));
        this.setBackground(Color.black);
        this.setDoubleBuffered(true);
        this.setFocusable(true);
        this.addKeyListener(this.keyHandler);
    }

    /**
     * Starts the game by creating and starting a new game thread.
     * If the game thread is already running, this method does nothing.
     */
    public void startGame() {
        if (gameThread == null) {
            this.requestFocusInWindow();
            gameThread = new Thread(this);
            currentMap = 1;
            gameStartTime = (int)System.currentTimeMillis();
            playMusic(0);
            loadNextMap();
            score = 0;
            gameThread.start();
        }
    }
    public void gameOver(){
        //TODO:
        stopMusic();
        playSound(7);
        System.out.println("Game Over");
        paused = true;
    }
    public void victory(){
        //TODO:
        stopMusic();
        playSound(6);
        System.out.println("Victory");
        paused = true;
    }

    public void loadNextMap(){
        currentMap++;
        if(currentMap > NUM_MAPS){
            victory();
            return;
        }
        gridManager.loadMap(currentMap);
        objectManager.loadObjects(currentMap);
        enemyManager.loadEnemies(currentMap);
    }

    @Override
    public void run(){
        double drawInterval = 1000000000 / Utility.FPS;
        double delta = 0;
        long lastTime = System.nanoTime();
        long currentTime;
        while (gameThread != null) {
            currentTime = System.nanoTime();

            delta += (currentTime - lastTime) / drawInterval;
            lastTime = currentTime;

            if(delta >= 1){
                if(!paused){
                    update();
                }
                repaint();
                delta--;
            }
        }
    }

    public void update() {
        player.update();
        enemyManager.update();
        objectManager.update();
    }

    public void paintComponent(Graphics g) {
        super.paintComponent(g);

        Graphics2D g2d = (Graphics2D)g;
        gridManager.draw(g2d);
        objectManager.draw(g2d);
        enemyManager.draw(g2d);
        player.draw(g2d);
        ui.draw(g2d);

        g2d.dispose();
    }

    public void playMusic(int index){
        music.setFile(index);
        music.play();
        music.loop();
    }
    public void stopMusic(){
        music.stop();
    }
    public void playSound(int index){
        soundEffects.setFile(index);
        soundEffects.play();
    }
    public void stopSound(){
        soundEffects.stop();
    }
}
