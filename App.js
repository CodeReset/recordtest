
import React, {useEffect, useState} from 'react';
import {Text, PermissionsAndroid, Button, ScrollView, View} from 'react-native'

import Recording from "react-native-recording";
import { Buffer } from 'buffer';
// import Sound from 'react-native-sound';


let listener

const App = ()=>{

  // const [sound, setSound] = useState(null)
  const [isAudioFile, setIsAudioFile] = useState(false)
  const [isRecordin, setIsRecording] = useState(false)
  const [audioFile, setAudioFile] = useState('')
  useEffect(() => {
  
    async function addPermission(){
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      
    }
    addPermission()
    Recording.init({
      bufferSize: 4096,
      sampleRate: 44100,
      bitsPerChannel: 16,
      channelsPerFrame: 1,
    });
   listener = Recording.addRecordingEventListener((data) =>
   {
    const chunk = Buffer.from(data, 'base64');
    console.log('chunk size', chunk.byteLength);
    console.log('Chunk', chunk)
     
        setAudioFile(chunk)
      
   }
  );
  }, [])

const startRecord = ()=>{
  console.log('START')
 
  Recording.start();
  setIsRecording(true)
}

const stopRecord = async ()=>{

  Recording.stop();
  listener.remove();
  setIsRecording(false)
  setIsAudioFile(true)

}

  return (
    <View>
 {
        isRecordin ? <Button title="Отсановить запись" onPress={stopRecord}/> :<Button title="Начать запись" onPress={startRecord}/>
      }
 
    <ScrollView>
      <Text>
        {JSON.stringify(audioFile)}
      </Text>
     
    </ScrollView>
    </View>
  )
}



export default App;
