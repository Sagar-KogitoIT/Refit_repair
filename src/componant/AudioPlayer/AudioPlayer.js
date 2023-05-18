import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FA5 from 'react-native-vector-icons/FontAwesome5';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const audioRecorderPlayer = new AudioRecorderPlayer();

const AudioPlayer = () => {
  const [recordTime, setRecordTime] = useState(0.0);
  const [recordSecs, setRecordSecs] = useState(0.0);
  const [currentPosition, setCurrentPositionSec] = useState(0.0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0.0);
  const [playTime, setPlayTime] = useState(0.0);
  const [duration, setDuration] = useState(0.0);

  const playFileName =
    'https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_100KB_MP3.mp3';

  const onStartPlay = async () => {
    const msg = await audioRecorderPlayer.startPlayer(playFileName);
    audioRecorderPlayer.addPlayBackListener(e => {
      setCurrentPositionSec(e.currentPosition);
      setCurrentDurationSec(e.duration);
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
      return;
    });

    console.log(msg);
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async () => {
    console.log('onStopPlay');
    await audioRecorderPlayer.stopPlayer();
    setPlayTime(0.0);
    audioRecorderPlayer.removePlayBackListener();
  };

  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        style={{
          width: '15%',
          // height: 20,
          margin: 20,
          resizeMode: 'contain',
        }}
        onPress={onStartPlay}>
        <FA5 name="play" size={30} color="#900" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '15%',
          // height: 20,
          margin: 15,
          resizeMode: 'contain',
        }}
        onPress={onPausePlay}>
        <FA5 name="pause" size={30} color="#900" />
      </TouchableOpacity>
    </View>
  );
};

export default AudioPlayer;
