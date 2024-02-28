package Main;

import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.Clip;
import java.net.URL;
import javax.sound.sampled.AudioSystem;

public class Sound {
    Clip clip;
    URL soundURL[] = new URL[30];

    public Sound(){
        soundURL[0] = getClass().getResource("/Sounds/Music/gameplay.wav");
        soundURL[1] = getClass().getResource("/Sounds/Music/Dungeon.wav");
        soundURL[2] = getClass().getResource("/Sounds/Effects/coin.wav");
        soundURL[3] = getClass().getResource("/Sounds/Effects/unlock.wav");
        soundURL[4] = getClass().getResource("/Sounds/Effects/powerup.wav");
        soundURL[5] = getClass().getResource("/Sounds/Effects/stairs.wav");
        soundURL[6] = getClass().getResource("/Sounds/Effects/fanfare.wav");
        soundURL[7] = getClass().getResource("/Sounds/Effects/gameover.wav");
        soundURL[8] = getClass().getResource("/Sounds/Effects/hitmonster.wav");
    }
    public void setFile(int index){
        try{
            AudioInputStream sound = AudioSystem.getAudioInputStream(soundURL[index]);
            clip = AudioSystem.getClip();
            clip.open(sound);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    public void play(){
        clip.setFramePosition(0);
        clip.start();
    }
    public void loop(){
        clip.loop(Clip.LOOP_CONTINUOUSLY);
    }
    public void stop(){
        clip.stop();
    }
}
