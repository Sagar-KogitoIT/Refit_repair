package com.refit;

import android.content.Context;
import android.media.AudioManager;
import android.media.SoundPool;
import android.os.Build;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class EarpieceModule extends ReactContextBaseJavaModule {

    @NonNull
    @Override
    public String getName(
    ) {
        return "EarpieceModule";
    }

    private AudioManager audioManager;
    private SoundPool soundPool;
    private int soundId;
    private boolean isPlaying;

    private int audioStreamNum;

    public EarpieceModule(ReactApplicationContext context) {
        super(context);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            audioManager = (AudioManager) getReactApplicationContext().getSystemService(Context.AUDIO_SERVICE);
            soundPool = new SoundPool(1, AudioManager.STREAM_VOICE_CALL, 0);
            soundId = soundPool.load(context, R.raw.voicenote, 1);
            isPlaying = false;
        }
    }

    @ReactMethod
    public void play() {
        if (!isPlaying) {
            audioManager.setMode(AudioManager.MODE_IN_CALL);
            audioManager.setSpeakerphoneOn(false);
            audioStreamNum = soundPool.play(soundId, 1f, 1f, 1, 0, 1f);
//            soundPool.play(soundId, 1f, 1f, 1, 0, 1f);
            isPlaying = true;
        }
    }

    @ReactMethod
    public void stop() {
        if (isPlaying) {
            soundPool.stop(audioStreamNum);
            audioManager.setMode(AudioManager.MODE_IN_CALL);
            audioManager.setSpeakerphoneOn(false);
            isPlaying = false;
        }
    }
}
