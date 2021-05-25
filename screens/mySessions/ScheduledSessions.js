import React from "react"
import { View, Text, StyleSheet, TextInput } from "react-native"



const ScheduledSessions = () => {
    return (
        <View >
        <View style={styles.con}>
            <Text>Scheduled Sessions</Text>
        </View>
   </View>


)
}

const styles = StyleSheet.create({

con:{
 flex:1,
 justifyContent:"center",
 alignItems:"center",
}
})

export default ScheduledSessions