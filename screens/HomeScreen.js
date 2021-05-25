import React,{useEffect} from "react"
import { View, Text, StyleSheet, TextInput } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { getSessions } from "../store/sessionsActions" 



const HomeScreen = () => {

    return (
        <View >
             <View style={styles.con}>
                 <Text style={{fontSize:24}}>home screeen</Text>
             </View>
        </View>


    )
}

const styles = StyleSheet.create({
  
  con:{
      
  width:"100%",
  height:"100%",
  justifyContent:"center",
  alignItems:"center"
      
  }
})

export default HomeScreen