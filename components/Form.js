 import React, { useState } from "react"
import { View, Text, StyleSheet, TextInput, Button ,Image, ActivityIndicator} from "react-native"
  


const Form = ({login,loginType,user}) => {
    const [loginValue,setLoginValue]=useState("")
    const [password,setPassword]=useState("")
    const [loading,setLoading]=useState(false)

  const loginValueHandler=(data)=>{
 
     setLoginValue(data)
     
  }
    const passwordHander=(data)=>{
        setPassword(data)
    }
   const submithandler=async()=>{
    setLoading(true) 
      await  login(user,loginType,loginValue,password)
     
        setLoading(false) 
 
   }
    return (
        <View style={{paddingBottom:20}} >
            {loginType === "email" ? (<View>
                <View style={styles.fullWidth}>
                <Text style={styles.formText}>البريد الالكترونى</Text>
            </View>
            <View style={styles.inputBox}>
                <TextInput value={loginValue} onChangeText={loginValueHandler} placeholder="البريد الالكترونى"   style={{ width: "100%", height: "100%" }} />

            </View>
            </View>):(<View>
                <View style={styles.fullWidth}>
                <Text style={styles.formText}>رقم الهاتف</Text>
            </View>
            <View style={{...styles.inputBox,...styles.phoneBox}}>
            <TextInput value={loginValue} onChangeText={loginValueHandler} placeholder="رقم الهاتف"   style={{ width: "73%", height: "100%" }} />

                <View style={styles.phoneContentBox}>
                     <Text  >+965</Text>
                     <Image style={{marginHorizontal:2}} source={require("../assets/images/arabic.png")} />
                     </View>

            </View>
            </View>)}
            <View style={styles.fullWidth}>
                <Text style={styles.formText}>كلمة المرور</Text>
            </View>
            <View style={styles.inputBox}>
                <TextInput secureTextEntry value={password} onChangeText={passwordHander} placeholder="كلمةالمرور" style={{ width: "100%", height: "100%" }} />

            </View>
            
            <View style={styles.fullWidth}>
                 <Text style={styles.textforget}   ><Image source={require("../assets/images/forgotpass.png")}    />نسيت كلمة المرور؟</Text>
            </View>
            {loading ? <ActivityIndicator color="#FFA500" size={26} />:  <View style={styles.btn}>
            
              <Button title="تسجيل الدخول" onPress={submithandler} color="#FFA500" disabled={password.length === 0 || loginValue.length === 0} />  
            </View>
}
        </View>


    )
}

const styles = StyleSheet.create({
    inputBox: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
        width: "100%",
        height: 40,
        overflow: "hidden",
        borderRadius: 20,
        padding: 10,
        marginVertical: 10,

    },
    formText: {
        fontSize: 18,
        color: "#FFA500"
    },
    btn: { 
        borderRadius: 20,
        borderColor: "#FFA500",
        borderWidth: 2, 
        overflow: "hidden" ,
        
    },
    fullWidth:{
        width:"100%"
    },
    phoneBox:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    phoneContentBox:{
        width:"25%",
        flexDirection:"row",
        justifyContent:"flex-end",
        borderLeftWidth:1,
        borderLeftColor:"red"
    },
    textforget:{fontSize:16,color:"black",margin:15}
     
})

export default Form