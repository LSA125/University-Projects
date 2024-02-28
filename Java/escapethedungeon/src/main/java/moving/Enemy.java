package moving;

import java.awt.image.BufferedImage;

import Main.GamePanel;
import Main.Utility;

public abstract class Enemy extends Moving{
    GamePanel gp;
    private BufferedImage[] leftFrames, rightFrames, curFrameDisplay;
    final int HITBOX_OFFSET = 16;
    final int NUM_FRAMES = 6;
    Enemy(int tileX, int tileY, GamePanel gp){
        this.gp = gp;
        this.x = tileX * Utility.TILE_SIZE;
        this.y = tileY * Utility.TILE_SIZE;
        this.prevX = tileX;
        this.prevY = tileY;
        this.targetX = tileX;
        this.targetY = tileY;
        loadFrames();
        hitBox = new java.awt.Rectangle(x + HITBOX_OFFSET/2, y + HITBOX_OFFSET, Utility.TILE_SIZE - HITBOX_OFFSET, Utility.TILE_SIZE - HITBOX_OFFSET);
        direction = "right";
    }
    abstract String getEnemyName();
    abstract int getSpeed();
    public void loadFrames(){
        leftFrames = Utility.getImageSet("/Enemies/" + getEnemyName() + "/left", NUM_FRAMES, Utility.TILE_SIZE);
        rightFrames = Utility.getImageSet("/Enemies/" + getEnemyName() + "/right", NUM_FRAMES, Utility.TILE_SIZE);
        curFrameDisplay = rightFrames;
    }

    private boolean validMove(int tileX, int tileY){
        return !gp.gridManager.isSolid(tileX, tileY) && !gp.objectManager.isSolid(tileX, tileY) && !gp.enemyManager.isOccupied(tileX, tileY);
    }

    public void update(){
        if(targetX == prevX && targetY == prevY){
            //move sideways first if x distance is greater than y distance, otherwise move up or down first
            if(Math.abs(targetX - gp.player.targetX) > Math.abs(targetY - gp.player.targetY)){
                if(targetX > gp.player.targetX && validMove(targetX-1, targetY)){
                    direction = "left";
                    targetX--;
                }else
                if(targetX < gp.player.targetX && validMove(targetX+1, targetY)){
                    direction = "right";
                    targetX++;
                }else 
                if(targetY > gp.player.targetY && validMove(targetX, targetY-1)){
                    direction = "up";
                    targetY--;
                }else
                if(targetY < gp.player.targetY && validMove(targetX, targetY+1)){
                    direction = "down";
                    targetY++;
                }
            }else{
                if(targetY > gp.player.targetY && validMove(targetX, targetY-1)){
                    direction = "up";
                    targetY--;
                }else
                if(targetY < gp.player.targetY && validMove(targetX, targetY+1)){
                    direction = "down";
                    targetY++;
                }else 
                if(targetX > gp.player.targetX && validMove(targetX-1, targetY)){
                    direction = "left";
                    targetX--;
                }else
                if(targetX < gp.player.targetX && validMove(targetX+1, targetY)){
                    direction = "right";
                    targetX++;
                }
            }
            curFrameDisplay = targetX > prevX ? rightFrames : leftFrames;
        }
        switch(direction){
            case "up":
                if(y-getSpeed() > targetY * Utility.TILE_SIZE){
                    y -= getSpeed();
                }else{
                    y = targetY * Utility.TILE_SIZE;
                    prevY = targetY;
                }
                break;
            case "down":
                if(y+getSpeed() < targetY * Utility.TILE_SIZE){
                    y += getSpeed();
                }else{
                    y = targetY * Utility.TILE_SIZE;
                    prevY = targetY;
                }
                break;
            case "left":
                if(x-getSpeed() > targetX * Utility.TILE_SIZE){
                    x -= getSpeed();
                }else{
                    x = targetX * Utility.TILE_SIZE;
                    prevX = targetX;
                }
                break;
            case "right":
                if(x+getSpeed() < targetX * Utility.TILE_SIZE){
                    x += getSpeed();
                }else{
                    x = targetX * Utility.TILE_SIZE;
                    prevX = targetX;
                }
                break;
        }
        hitBox.x = x + HITBOX_OFFSET/2;
        hitBox.y = y + HITBOX_OFFSET;
        if(hitBox.intersects(gp.player.hitBox)){
            gp.gameOver();
        }
    }

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
    public void draw(java.awt.Graphics2D g2d){
        g2d.drawImage(animate(), x, y, null);
    }
}
