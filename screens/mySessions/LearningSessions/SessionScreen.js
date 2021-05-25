import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TextInput,BackHandler, FlatList, Image, TouchableOpacity,ActivityIndicator } from "react-native"
import { Audio } from 'expo-av';
import { getChat, sendMessage } from "../../../store/sessionsActions"
import { useDispatch, useSelector } from "react-redux";
import { AntDesign, FontAwesome,Feather } from '@expo/vector-icons';
import MessageItem from "../../../components/MessageItem"
import { ProgressBar } from 'react-native-paper';
 




const SessionScreen = (props) => {
  const messages = useSelector(state => state.sessions.selectedMessages)
  
  const user = useSelector(state => state.auth.user)
  const [textMessage, setTextMessage] = useState("")
  const [recording, setRecording] = useState()
  const [recordingLength, setRecordingLength] = useState(0);
  const [audio, setAudio] = useState()
  const [audioLenght, setAudioLenght] = useState(0)
  const [sound, setSound] = useState()
  const [seconds,setSeconds]=useState(0)
  const [minutes,setMinutes]=useState(0)
  const [playing,setPlaying]=useState(false)
  const [loading,setLoading]=useState(false)

  const dispatch = useDispatch()
  const { route ,navigation} = props

  const getMessagesList=async()=>{
    setLoading(true)
 await  dispatch(getChat(route.params.chatId))
 setLoading(false)
  }

  useEffect(() => {
    getMessagesList()
   
  }, []);
     const backAction = () => {
    setAudio(null), 
    setRecording(null)
 };
  useEffect(() => {
   

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

   useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
       backAction
    });

    return unsubscribe;
  }, [navigation]);


  async function startRecording() {
    try {
      
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();

      recording.setOnRecordingStatusUpdate(status => {
         setRecordingLength(status["durationMillis"])
      })
      
      setRecording(recording);
      console.log('Recording started');

    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setAudio(uri)
    console.log('Recording stopped and stored at', uri);
  }
  async function playSound(file) {
setPlaying(true)
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      { uri: file });
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate(status => {
      setAudioLenght(status["positionMillis"])
    });


  }
  function stopSound() {
    sound.stopAsync()
    setPlaying(false)


  }
  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
        
      }
      : undefined;
  }, [sound]);
  
  const recordingCounter=(recordingLength)=>{
    if(recordingLength=== undefined || recordingLength=== 0){
      return false
    }

    return  true
  }
  

 
useEffect(()=>{
  const seconds=Math.floor((recordingLength/1000)%60).toString().padStart(2, '0')
  const minutes=Math.floor((recordingLength/1000)/60).toString().padStart(2, '0')
  setSeconds(seconds)
  setMinutes(minutes)
},[recordingLength])


if(loading){
  return <View style={{...styles.container,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size="large" color="black" /></View>
}
  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={getMessagesList}
        refreshing={loading}
        contentContainerStyle={{ padding: 10 }}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return <MessageItem item={item} />
        }}
      />

      <View style={{ backgroundColor: "#eeee", height: 100, width: "100%", justifyContent: "center", alignItems: "center" }}>
        {user === "teacher" && <View style={{ width: "100%", height: 100, padding: 10, flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }} >

          {audio && textMessage.trim().length === 0 && <TouchableOpacity >
            <View style={{ width: 360, height: 30, flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginHorizontal: 10, marginBottom: 5 }}>
              <TouchableOpacity onPress={() => {
                dispatch(sendMessage(route.params.chatId, "audio", audio, audioLenght / 1000))
                setAudio(null)
              }}>
                <Image style={{ width: 40, height: 30 }} source={require("../../../assets/images/upload.png")} />

              </TouchableOpacity>
              <View style={{ justifyContent: "center", width: 220, height: 50, padding: 5 }}>
                <ProgressBar progress={audioLenght / recordingLength } color="#FFA500" />

              </View>



              <TouchableOpacity onPress={() => playSound(audio)}>
                <AntDesign name="caretright" size={24} color="black" />
              </TouchableOpacity>
            </View>

          </TouchableOpacity>
          }
          <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
            {textMessage.trim().length > 0 && <TouchableOpacity onPress={() => {
              dispatch(sendMessage(route.params.chatId, "text", textMessage))
              setTextMessage("")

            }}>

              <Image style={{ width: 30, height: 40 }} source={require("../../../assets/images/upload.png")} />


            </TouchableOpacity>
            }
            {textMessage.trim().length === 0 && <TouchableOpacity onPress={recording ? stopRecording : startRecording}>
              <View style={{ width: 60, height: 30, flexDirection: "row", justifyContent: "center" }}   >
                {recording ? <FontAwesome name="stop" size={20} color="black" /> : <Image style={{ width: 40, height: 40 }} source={require("../../../assets/images/recordblack.png")} />}

              </View>
            </TouchableOpacity>}
            <TextInput secureTextEntry={true} placeholder="write a message" style={{ backgroundColor: "white", width: 270, margin: 10, padding: 5, borderWidth: 1, borderColor: "rgba(0,0,0,.5)", borderRadius: 10 }} value={textMessage} onChangeText={(message) => {
              setTextMessage(message)
            }}></TextInput>

          </View>



        </View>}
     {recordingCounter(recordingLength)&&recording &&<Text style={{fontSize:26}}>{minutes}:{seconds}</Text>
}  
        {audio && user !== "teacher" && <TouchableOpacity >
          <View style={{ width: 400, height: 40, flexDirection: "row", justifyContent: "space-around", marginHorizontal: 10, marginTop: 20 }}>
            <TouchableOpacity onPress={() => {
              dispatch(sendMessage(route.params.chatId, "audio", audio, audioLenght / 1000))
              setAudio(null)
            }}>
              <Image style={{ width: 40, height: 40 }} source={require("../../../assets/images/upload.png")} />

            </TouchableOpacity>

            <View style={{ justifyContent: "center", width: 200, height: 50, padding: 1 }}>
            <ProgressBar progress={audioLenght / recordingLength} color="#FFA500" />
               
            </View>
            <TouchableOpacity onPress={() =>{
              if(!playing){
                playSound(audio)
              }else{
                stopSound()
              }
               }}>
            {playing ? <FontAwesome name="stop" size={24} color="black" /> : <AntDesign name="caretright" size={36} color="black" />}
            </TouchableOpacity>
          </View>

        </TouchableOpacity>
        }
        {user !== "teacher" && <TouchableOpacity onPress={recording ? stopRecording : startRecording}>

          {recording ? <View style={{ width: 150, marginBottom: 5 }}   >
            <Text style={{ textAlign: "center", color: "white" }}>  <FontAwesome name="stop" size={20} color="black" />   </Text>

          </View>
            :
            <View style={{ backgroundColor: "#FFA500", width: 150, height: 50, borderWidth: 2, overflow: "hidden", borderRadius: 10, borderColor: "#FFA500", marginBottom: 5 }}   >
              <Text style={{ textAlign: "center", color: "white" }}>   <Text>ابدا التسميع<Image source={require("../../../assets/images/record.png")} /></Text>  </Text>

            </View>}
        </TouchableOpacity>}

      </View>

    </View>
  )
}
export const SessionScreenOptions = (navData) => {
  const title = navData.route.params.name
  return {
    headerTitle: title,
    headerStyle: {
      backgroundColor: "#FFA500",


    },
  
    headerTitleStyle: { alignSelf: 'center', },
    
  }
}
export default SessionScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
})


