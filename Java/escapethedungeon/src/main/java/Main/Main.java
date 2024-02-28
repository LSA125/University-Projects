package Main;

import javax.swing.JFrame;


public class Main {
    public static void main(String[] args) {
        JFrame window = new JFrame("Escape the Dungeon");
        window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        window.setResizable(false);

        PanelManager panelManager = new PanelManager();

        // Add the container to the window
        window.add(panelManager.getContainer());

        // Show the menu panel by default
        panelManager.showMainMenu();

        window.pack();
        window.setLocationRelativeTo(null);
        window.setVisible(true);
    }
    
}