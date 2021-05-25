import React from "react"
import { View, Text, StyleSheet, TextInput } from "react-native"



const MyReadingsScreen = () => {
    return (
        <View >
        <View style={styles.con}>
            <Text style={{fontSize:24}}>My Readings screen</Text>
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

export default MyReadingsScreen