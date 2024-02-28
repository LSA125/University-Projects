package Main;

import javax.swing.JPanel;
import java.awt.CardLayout;


/*
 * PanelManager class
 * Manages the all panels
 * Uses a CardLayout to switch between the panels
 */
class PanelManager {
    private GamePanel gamePanel;
    private MenuPanel menuPanel;
    private CardLayout cardLayout;
    private JPanel container;


    /*
     * Constructor for PanelManager
     * Initializes the cardLayout and container
     * Adds the menuPanel and gamePanel to the container
     * Adds a KeyHandler to the container
     */
    public PanelManager() {
        cardLayout = new CardLayout();
        container = new JPanel();
        container.setLayout(cardLayout);
        container.setFocusable(true);
        KeyHandler keyHandler = new KeyHandler();
        container.addKeyListener(keyHandler);
        gamePanel = new GamePanel(keyHandler);
        menuPanel = new MenuPanel(this);
        
        container.add(menuPanel, "menu");
        container.add(gamePanel, "game");
    }

    /*
     * Shows the main menu
     */
    public void showMainMenu() {
        cardLayout.show(container, "menu");
    }
    /*
     * Shows the game
     */
    public void showGame() {
        gamePanel.startGame();
        cardLayout.show(container, "game");
        
    }
    /*
     * Returns the container
     */
    public JPanel getContainer() {
        return container;
    }
    /*
     * Returns the gamePanel
     */
    public GamePanel getGamePanel() {
        return gamePanel;
    }
}