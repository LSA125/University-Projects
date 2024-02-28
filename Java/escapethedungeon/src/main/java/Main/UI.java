package Main;

import java.awt.Graphics2D;
import java.awt.Font;
import java.awt.Color;

public class UI {
    GamePanel gp;
    Font font;
    public UI(GamePanel gp){
        this.gp = gp;
        font = new Font("Arial", Font.BOLD, 40);
    }

    public void draw(Graphics2D g2d){
    
        //Draw shadow
        g2d.setFont(font);
        g2d.setColor(Color.GRAY);
        g2d.drawString("Score: " + gp.score, 12, 52);
        
        //Draw actual text
        g2d.setColor(Color.WHITE);
        g2d.drawString("Score: " + gp.score, 10, 50);

        //Draw shadow
        g2d.setFont(font);
        g2d.setColor(Color.GRAY);
        g2d.drawString("Time: " + gp.getTime(), 12, 94);
        
        //Draw actual text
        g2d.setColor(Color.WHITE);
        g2d.drawString("Time: " + gp.getTime(), 10, 92);
    }

    
}