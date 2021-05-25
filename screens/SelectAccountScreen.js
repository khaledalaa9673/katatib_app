import React ,{ useEffect ,useState}  from 'react';
import { View, Text, StyleSheet, Image ,TouchableWithoutFeedback, Platform, Dimensions} from "react-native"
import { RadioButton } from 'react-native-paper';


const SelectAccountScreen = (props) => {
    const [userType, setUserType] =useState('')
 const {navigation }=props
    useEffect(() => {
      if(userType.length > 0){ // handle the first render state from undifined to empty string 
        navigation.navigate("Login", {

            type: userType
        })
      }
    },[userType])
    

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../assets/images/logolanguage.png")} />
            <Text style={styles.text}>مرحبا فى برنامج كتاتيب بوابة التواصل بين المحفظين والمتعلمين للقران الكريم</Text>
            <View style={styles.form}>
                <Text style={styles.text}>اختر نوع الحساب</Text>
                <RadioButton.Group onValueChange={newValue => setUserType(newValue)} value={userType}>
                   <TouchableWithoutFeedback onPress={()=>{
                     setUserType("student")
                     props.navigation.navigate('Login',{
                         type:'student'
                     })

                   }}>
                   <View style={styles.radio}>
                        
                        <Image style={{ width: 35, height: 30 }} source={require("../assets/images/student.png")} />
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text style={styles.formText}>طالب</Text>
                            <RadioButton value="student" color="#FFA500" />
                        </View>


                    </View>
                   </TouchableWithoutFeedback>
                   <TouchableWithoutFeedback onPress={()=>{
                     setUserType("teacher")
                     props.navigation.navigate('Login',{
                        type:'teacher'
                    })
                   }}>
                    <View style={styles.radio}>
                        <Image style={{ width: 35, height: 30 }} source={require("../assets/images/techer.png")} />

                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text style={styles.formText}>معلم</Text>
                            <RadioButton value="teacher" color="#FFA500" />
                        </View>
                       


                    </View>
                    </TouchableWithoutFeedback> 
                </RadioButton.Group>

            </View>
            <Image source={require("../assets/images/shape.png")}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 25,
        alignItems: "flex-end"
    },
    image: {
        marginBottom: 40
    },
    text: {

        fontSize: 30,
        textAlign: "right"
    },
    form: {
        marginTop: 40,
        alignItems: "flex-end"
    },
    radio: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,.1)",
        width: Dimensions.get("window").width *.8,
        height: 40,
        borderRadius: 20,
        margin: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        padding: 3,
    height:50
    },
    formText: {
        fontSize: 26
    }

})
export default SelectAccountScreen