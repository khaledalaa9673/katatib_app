import React, { useState } from "react"
import { View, Text, StyleSheet, TextInput, Button ,Image} from "react-native"



const LoginByGoogle = (props) => {
    
  
    return (
        <View style={{  borderTopWidth:2,borderTopColor:"rgba(0,0,0,.1)",marginVertical:10,alignItems:"flex-end"}}>
            <Text style={styles.text}>او سجل باستخدام</Text>
            <View style={{borderWidth:1,borderColor:"red",borderRadius:25,width:140, paddingVertical:5,flexDirection:"row",justifyContent:"space-around"}}>
                
            <Text style={{color:'red',fontSize:20,opacity:.5}} > Google</Text>
            <Image source={require("../assets/images/google.png")} />
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
  
     text:{
         fontSize:18,
         marginVertical:10

     }
})

export default LoginByGoogle