package Main;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JPanel;
import java.awt.*;


/*
 * MenuPanel is a JPanel that contains a button to start the game.
 */
public class MenuPanel extends JPanel {
    private JButton playButton;
    Sound music = new Sound();
    /*
     * Constructor for MenuPanel
     * @param onStartGame a Runnable that starts the game
     * @param cardLayout the CardLayout used to switch between menu and game panels
     * @param container the JPanel that contains the menu and game panels
     */
    public MenuPanel(PanelManager panelManager) {
        
        //button settings
        playButton = new JButton("Play");
        playButton.addActionListener(e -> {stopMusic(); panelManager.showGame(); });
        playButton.setForeground(Color.WHITE);
        playButton.setBackground(Color.GRAY);
        Font buttonFont = new Font("Arial", Font.BOLD, 20);
        playButton.setFont(buttonFont);
        playButton.setBorder(BorderFactory.createLineBorder(Color.WHITE, 1));
        
        add(playButton);
        playMusic();
    }

    public void playMusic(){
        music.setFile(1);
        music.loop();
    }
    public void stopMusic(){
        music.stop();
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        Graphics2D g2d = (Graphics2D) g;
    
        //Set the background color to black
        g2d.setColor(Color.BLACK);
        g2d.fillRect(0, 0, getWidth(), getHeight());
    
        //Draw Escape the Dungeon text
        String escapeText = "Escape the Dungeon";
        Font escapeFont = new Font("Arial", Font.BOLD, 36);
        g2d.setFont(escapeFont);
    
        //Calculate escape text width and height
        FontMetrics fm = g2d.getFontMetrics();
        int escapeTextWidth = fm.stringWidth(escapeText);
        int escapeTextHeight = fm.getHeight();
    
        //Calculate escape text position
        int escapeX = (getWidth() - escapeTextWidth) / 2;
        int escapeY = (getHeight() - escapeTextHeight) / 4 + fm.getAscent();
    
    
        //Draw gray shadow
        g2d.setColor(Color.GRAY);
        g2d.drawString(escapeText, escapeX + 2, escapeY + 2);

        //Draw white text
        g2d.setColor(Color.WHITE);
        g2d.drawString(escapeText, escapeX, escapeY);
    }
}
