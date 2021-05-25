import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
export const LOGIN = "LOGIN"
export const login = (user, method, loginValue, password) => {
    console.log(user + " " + method + " " + loginValue + " " + password)
    return async (dispatch) => {
        let userType
        if (user === "teacher") {
            userType = "2"
        } else {
            userType = "3"
        }
        let data
        if (method === "email") {
            data = {
                type: userType,
                method_type: "email",
                email: loginValue,
                password: password,

            }
        } else {
            data = {
                type: userType,
                method_type: "phone",
                phone: loginValue,
                password: password,

            }
        }



        try {
            const response = await axios.post("https://katateeb-test.roqay.solutions/api/v2/login", data
                , {
                    headers: {
                        'Accept': 'application/json;',
                        'Content-Type': "application/json;charset=UTF-8",
                        "Accept-Language": "ar",

                    },
                }

            )
            if (response.data.status === 200) {
                AsyncStorage.setItem("user", user)
                AsyncStorage.setItem("token",  response.data.access_token)
                 dispatch({
                    type:LOGIN,
                    token: response.data.access_token,
                    user:user
                     
                })
               
            }
        } catch (error) {
        throw new Error("something Invalid")
        }
    }
}
export const TRY_AUTO_LOGIN="TRY_AUTO_LOGIN"
export const tryLogin=(token,user)=>{
 
    return {
        type:TRY_AUTO_LOGIN,
        token:token,
        user:user
       }
}
/*
  console.log(response.data.access_token)
           
expires_at
status
token_type
user.id*/