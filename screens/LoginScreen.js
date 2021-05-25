import React, { useState, useEffect,useCallback } from "react"
import { View, Text, StyleSheet, Image, ScrollView, ImageBackground, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Dimensions, Alert } from "react-native"
import { RadioButton } from 'react-native-paper';
import Form from "../components/Form"
import { useDispatch } from "react-redux"
import { login } from "../store/authActions"
import LoginByGoogle from "../components/LoginByGoogle"



const LoginScreen = (props) => {
    const [error, setError] = useState(false)
    const [loginType, setLoginType] = useState('email');
    const dispatch = useDispatch()

    const loginHandler = async   (user, method, loginValue, password) => {
        if (loginValue.trim().length === 0 || password.trim().length === 0) {
            Alert.alert("Something Went wrong", "complete the input field", [{ text: "Okay", style: "cancel" }])
            return
        }


        try {
            await dispatch(login(user, method, loginValue, password))

        } catch (error) {
            setError(true)

        }
    } 
    useEffect(() => {
        if (error) {
            Alert.alert("Something Went wrong", "please enter a valid password and email", [{
                text: "Okay", onPress: () => {
                    setError(false)
                }
            }])
        }
    }, [error])
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.backgroundImage} source={require("../assets/images/bglogin.png")}>


                <View style={{ marginTop: 30, marginLeft: 80, flexDirection: "row", justifyContent: "space-around" }}>
                    <Text style={{ ...styles.text }}>تسجيل الدخول</Text>
                    <TouchableOpacity onPress={() => {
                        props.navigation.goBack()
                    }}>
                        <Image style={{ width: 30, height: 40 }} source={require("../assets/images/back.png")} />
                    </TouchableOpacity>
                </View>


                <ScrollView>
                    <Image style={styles.image} source={require("../assets/images/logologinuser.png")} />
                    <View style={styles.form}>
                        <Text style={{ ...styles.textform, fontSize: 20 }}>مرحبا بك مجددا!</Text>
                        <Text style={styles.textform}>سجل الدخول باستخدام</Text>
                        <RadioButton.Group onValueChange={newValue => setLoginType(newValue)} value={loginType}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <TouchableWithoutFeedback onPress={() => { setLoginType("phone") }}>
                                    <View style={styles.radio}>
                                        <Text style={styles.formText}>رقم الهاتف</Text>
                                        <RadioButton value="phone" color="#FFA500" />
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {
                                    setLoginType("email")
                                }}>
                                    <View style={styles.radio}>
                                        <Text style={styles.formText}>البريدالالكترونى</Text>
                                        <RadioButton value="email" color="#FFA500" />

                                    </View>
                                </TouchableWithoutFeedback>

                            </View>
                        </RadioButton.Group>
                        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
                            <Form login={loginHandler} loginType={loginType} user={props.route.params.type} />
                        </KeyboardAvoidingView>
                        {props.route.params.type === "student" && <View>

                            <LoginByGoogle />
                            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <TouchableWithoutFeedback onPress={() => { }}>
                                    <Text style={styles.newAccount}>انشئ حساب جديد</Text>
                                </TouchableWithoutFeedback>
                                <Text style={styles.noAccount}>ليس لديك حساب؟</Text>

                            </View>
                        </View>}
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%"


    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'



    },
    image: {
        marginHorizontal: "38%",
        marginBottom: 10

    },
    form: {
        width: "90%",

        backgroundColor: "white",
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 10,
        paddingBottom: 20, margin: 30

    },
    text: {

        fontSize: 30,
        color: "white"
    },
    textform: {
        fontSize: 18,
        textAlign: "right",
        color: "black"
    },
    radio: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,.1)",
        width: Dimensions.get("window").width * .4,
        height: 40,
        borderRadius: 20,
        margin: 5,
        flexDirection: "row",
        justifyContent: "flex-end",

    },
    formText: {
        fontSize: 18
    },
    newAccount: {
        color: "#FFA500",
        fontSize: 18
    },
    noAccount: {
        color: "black",
        fontSize: 18
    }

})
export default LoginScreen