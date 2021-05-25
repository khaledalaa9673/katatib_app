import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';




   /// state recived from parant with boolean value to  stop the audio when 
   ////i recoded this state will set in the begging  of the record function  and send as props oin messageitem component

const MessageItem = (props) => {
    const { item } = props
    const [sound, setSound] = useState()
    const [timer, setTimer] = useState(0)


    async function playSound(file) {

        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            { uri: file });
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate(status => {
            setTimer(Math.floor(status.positionMillis / 1000))
        });


    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <View style={{ backgroundColor: item.sender === "Roqay Test Teacher" ? "#9F9A99" : "#00008b", width: Dimensions.get("window").width * .9, padding: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, borderBottomLeftRadius: item.sender === "Roqay Test Teacher" ? 0 : 30, borderBottomRightRadius: item.sender === "Roqay Test Teacher" ? 30 : 0, margin: 10 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: "white" }}>{item.created_at}</Text>
                <Text style={{ color: "white" }}>{item.sender}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
                {item.type === "audio" &&<TouchableOpacity onPress={() => playSound(item.file)}>
                    <AntDesign name="caretright" size={24} color="white" />
                </TouchableOpacity>
                }
                {item.type === "audio" && <Image style={{ width: Dimensions.get("window").width * .4, height: 30 }} source={require("../assets/images/soundwavewhite.png")} />}

                {item.type !== "audio" && <Text style={{ color: "white", fontSize: 20 }}>{item.message}</Text>}

                {item.type === "audio" && <Text style={{ color: "white" }}>{timer > 60 ? Math.floor(timer / 60) : "00"}:{Math.round(timer % 60).toString().padStart(2, '0')}</Text>}

            </View>


        </View>)
}

const styles = StyleSheet.create({


})

export default MessageItem