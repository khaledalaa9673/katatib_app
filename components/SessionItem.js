import React, { useState } from "react"
import { View, Text, StyleSheet, TextInput, Button, Image, Dimensions } from "react-native"



const SessionItem = (props) => {


    return (
        <View style={styles.item}>
            <Text style={styles.font}>جلسة : {props.content}</Text>
            <Text style={styles.font}> نوع القراءة : {props.reading_type}</Text>
            <Text style={{ ...styles.font, textAlign: "right" }}>متعلم : {props.student_name}</Text>
            <Text style={{ ...styles.font, color: "black" }}>الحالة :  <Text style={{ ...styles.font, color: "#FFA500" }}>{props.status_text}</Text></Text>
            {props.rate_text !== null ? <Text style={styles.font}>التقييم :{props.rate_text}</Text> : null}
            <Text><Image source={require("../assets/images/time.png")} />{props.time}</Text>
        </View>


    )
}

const styles = StyleSheet.create({
    item: { 
        padding: 10,
        width: Dimensions.get("window").width *.9,
        backgroundColor: "white",
        marginVertical: 10,
         marginHorizontal: 20
         },
    font: {
        fontSize: 20,
        marginTop: 5
    }

})

export default SessionItem