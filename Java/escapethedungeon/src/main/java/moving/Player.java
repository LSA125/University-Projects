package moving;

import Main.KeyHandler;
import Main.GamePanel;

import java.awt.Graphics2D;

import java.awt.image.BufferedImage;

import Main.Utility;

public class Player extends Moving{
    GamePanel gp;
    KeyHandler kh;
    BufferedImage[] leftFrames, rightFrames, curFrameDisplay;
    BufferedImage[] idleLeftFrames, idleRightFrames;

    final int HITBOX_OFFSET = 16;
    private int speedBuffTicks = 0, speedBuffDuration;
    private boolean isSpeedBuff = false;
    final int DEFAULT_SPEED = 4;
    public Player(GamePanel gp, KeyHandler kh){
        this.gp = gp;
        this.kh = kh;
        init();
    }
    public void setPos(int tileX, int tileY){
        x = tileX * Utility.TILE_SIZE;
        y = tileY * Utility.TILE_SIZE;
        prevX = tileX;
        prevY = tileY;
        targetX = tileX;
        targetY = tileY;
    }
    private void init(){
        final int startX = 2;
        final int startY = 0;
        x = startX * Utility.TILE_SIZE;
        y = startY * Utility.TILE_SIZE;

        prevX = 2;
        prevY = 0;
        targetX = 2;
        targetY = 0;

        speed = DEFAULT_SPEED;

        direction = "right";

        loadFrames();
        curFrameDisplay = rightFrames;
        hitBox = new java.awt.Rectangle(x + HITBOX_OFFSET/2, y + HITBOX_OFFSET, Utility.TILE_SIZE - HITBOX_OFFSET, Utility.TILE_SIZE - HITBOX_OFFSET);
    }

    private void loadFrames(){
        final int RUN_FRAMES = 6;
        leftFrames = Utility.getImageSet("/Player/run/Player_Left", RUN_FRAMES, Utility.TILE_SIZE);
        rightFrames = Utility.getImageSet("/Player/run/Player_Right", RUN_FRAMES, Utility.TILE_SIZE);

        final int IDLE_FRAMES = 4;
        idleLeftFrames = Utility.getImageSet("/Player/idle/left", IDLE_FRAMES, Utility.TILE_SIZE);
        idleRightFrames = Utility.getImageSet("/Player/idle/right", IDLE_FRAMES, Utility.TILE_SIZE);
    }

    public void update(){
        if(targetX == prevX && targetY == prevY){
            if(kh.up && !gp.gridManager.isSolid(prevX, prevY - 1) && !gp.objectManager.isSolid(prevX, prevY - 1)){
                direction = "up";
                targetY--;
            }else
            if(kh.down && !gp.gridManager.isSolid(prevX, prevY + 1) && !gp.objectManager.isSolid(prevX, prevY + 1)){
                direction = "down";
                targetY++;
            }else
            if(kh.left && !gp.gridManager.isSolid(prevX - 1, prevY) && !gp.objectManager.isSolid(prevX - 1, prevY)){
                direction = "left";
                targetX--;
            }else
            if(kh.right && !gp.gridManager.isSolid(prevX + 1, prevY) && !gp.objectManager.isSolid(prevX + 1, prevY)){
                direction = "right";
                targetX++;
            }

            //prep animation
            if(kh.up){
                if(curFrameDisplay == leftFrames || curFrameDisplay == idleLeftFrames){
                    curFrameDisplay = leftFrames;
                }else{
                    curFrameDisplay = rightFrames;
                }
            }else
            if(kh.down){
                if(curFrameDisplay == leftFrames || curFrameDisplay == idleLeftFrames){
                    curFrameDisplay = leftFrames;
                }else{
                    curFrameDisplay = rightFrames;
                }
            }else
            if(kh.left){
                curFrameDisplay = leftFrames;
            }else
            if(kh.right){
                curFrameDisplay = rightFrames;
            }else{
                //idle
                if(curFrameDisplay == leftFrames || curFrameDisplay == idleLeftFrames){
                    curFrameDisplay = idleLeftFrames;
                }else{
                    curFrameDisplay = idleRightFrames;
                }
            }
        }
        switch(direction){
            case "up":
                if(y-speed > targetY * Utility.TILE_SIZE){
                    y -= speed;
                }else{
                    gp.objectManager.collideWithObject(targetX, targetY);
                    y = targetY * Utility.TILE_SIZE;
                    prevY = targetY;
                }
                break;
            case "down":
                if(y+speed < targetY * Utility.TILE_SIZE){
                    y += speed;
                }else{
                    gp.objectManager.collideWithObject(targetX, targetY);
                    y = targetY * Utility.TILE_SIZE;
                    prevY = targetY;
                }
                break;
            case "left":
                if(x-speed > targetX * Utility.TILE_SIZE){
                    x -= speed;
                }else{
                    gp.objectManager.collideWithObject(targetX, targetY);
                    x = targetX * Utility.TILE_SIZE;
                    prevX = targetX;
                }
                break;
            case "right":
                if(x+speed < targetX * Utility.TILE_SIZE){
                    x += speed;
                }else{
                    gp.objectManager.collideWithObject(targetX, targetY);
                    x = targetX * Utility.TILE_SIZE;
                    prevX = targetX;
                }
                break;
        }
        if(isSpeedBuff){
            speedBuffTicks++;
            if(speedBuffTicks >= speedBuffDuration){
                isSpeedBuff = false;
                speedBuffTicks = 0;
                speed = DEFAULT_SPEED;
            }
        }
        hitBox.x = x + HITBOX_OFFSET/2;
        hitBox.y = y + HITBOX_OFFSET;
    }

    /*
     * Buffs the speed of the player
     * @param speedMultiplier the multiplier for the speed
     * @param frames the duration of the buff
     */
    public void buffSpeed(float speedMultiplier, int frames){
        isSpeedBuff = true;
        speedBuffDuration = frames;
        speed = (int)(DEFAULT_SPEED * speedMultiplier);
    }

    /*
     * Animates the player
     * @return the current frame of the animation
     */
    private BufferedImage animate(){
        if(frameCounter == 10){
            frameCounter = 0;
            curFrame++;
        }
        if(curFrame >= curFrameDisplay.length){
            curFrame = 0;
        }
        frameCounter++;
        return curFrameDisplay[curFrame];
        
    }
    /*
     * Draws the player
     */
    public void draw(Graphics2D g2d){
        g2d.drawImage(animate(), x, y, Utility.TILE_SIZE, Utility.TILE_SIZE, null);
    }
}
