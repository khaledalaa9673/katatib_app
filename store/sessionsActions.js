import axios from "axios"

import AsyncStorage from '@react-native-async-storage/async-storage'
 
export const GET_SESSIONS = "GET_SESSIONS"
export const GET_CHAT = "GET_CHAT"
export const SEND_MESSAGE = "SEND_MESSAGE"



export const getSessions = () => {
    return async (dispatch, getState) => {
        const token = await AsyncStorage.getItem("token")   // or from redux using getState  
        try {
            const response = await axios.post("https://katateeb-test.roqay.solutions/api/v2/get-sessions?page=1",
                {

                    session_type: "1"
                }, {

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/json;charset=UTF-8",
                    "Accept-Language": "ar",
                    "Authorization": `Bearer ${token}`

                },
            }

            )

            if (response.status === 200) {
                const sessions = []
                response.data["data"].forEach(element => {
                    const newElemet = {
                        content: element.content,
                        reading_type: element.reading_type.name,
                        student_name: element.student_name,
                        status_text: element.status_text,
                        rate_text: element.rate_text,
                        chatId: element.chat.id,
                        create_at: element.session_request_date

                    }
                    sessions.push(newElemet)
                })


                dispatch({
                    type: GET_SESSIONS,
                    sessions: sessions
                })
            }

        } catch (error) {
            console.log(error)
        }
    }
}


export const getChat = (chatId) => {
    return async (dispatch, getState) => {
        const token = await AsyncStorage.getItem("token")

        try {
            const response = await axios.get(`https://katateeb-test.roqay.solutions/api/v2/get-chats/${chatId}?page=1`, {

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/json;charset=UTF-8",
                    "Accept-Language": "ar",
                    "Authorization": `Bearer ${token}`

                },
            }

            )

            if (response.status === 200) {
                const messages = []
                response.data["data"].forEach(element => {

                    const newElemet = {
                        id: element.id,
                        file: element.file,
                        created_at: element.created_at,
                        sender: element.from.name,
                        message: element.message,
                        type: element.type,
                        record_length: element.record_length,
                         

                    }
                    messages.push(newElemet)
                })
                console.log(response.rate)

                dispatch({
                    type: GET_CHAT,
                    messages: messages
                })
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const sendMessage = (chatId, type, value, record_length) => {
   if(type==="text"){
    return async (dispatch, getState) => {
        
        let formData
        let headers
        const token = await AsyncStorage.getItem("token")
 
         
            formData = {
                chat_id:chatId,
                type:"text",
                message:value
            }
           headers= {
                'Accept': 'application/json',
                'Content-Type': "application/json;charset=UTF-8",
                "Accept-Language": "ar",
                "Authorization": `Bearer ${token}`
        
        }
        try {
            console.log(formData)
            console.log( headers)
            const response = await axios.post(`https://katateeb-test.roqay.solutions/api/v2/add-message`,formData, {


                headers:headers
            }

            )
 
            if (response.status === 200) {
                response.data["data"]
                const newMessage = {
                    id: response.data["data"].id,
                    file: response.data["data"].file,
                    created_at: response.data["data"].created_at,
                    sender: response.data["data"].from.name,
                    message: response.data["data"].message,
                    type: response.data["data"].type,
                    record_length: response.data["data"].record_length

                }
                dispatch({
                    type: SEND_MESSAGE,
                    message: newMessage
                })
            }

        } catch (error) {
            console.log(error)
        }
    }
   }else{
    return async (dispatch, getState) => {
        let Seconds
        let Minutes
        let formData
        let headers
        const token = await AsyncStorage.getItem("token")
 

            Seconds = Math.floor((record_length/1000)%60).toString().padStart(2, '0')
            Minutes = Math.floor((record_length/1000)/60).toString().padStart(2, '0')
           
         
              formData = new FormData();
            formData.append('chat_id',chatId );
            formData.append("type", "audio");
            formData.append('file', {
                uri: value,         
                type: "audio/MPEG-4",  
                name: "upload.mp4"    
            });
            formData.append('record_length',`${Minutes}:${Seconds}`);       
        
        headers= {
            'Accept': 'application/json',
            'Content-Type': "multipart/form-data;charset=UTF-8",
            "Accept-Language": "ar",
            "Authorization": `Bearer ${token}`

        }
      
        try {
            console.log(formData)
            console.log( headers)
            const response = await axios.post(`https://katateeb-test.roqay.solutions/api/v2/add-message`,formData, {


                headers:headers
            }

            )
 
            if (response.status === 200) {
                response.data["data"]
                const newMessage = {
                    id: response.data["data"].id,
                    file: response.data["data"].file,
                    created_at: response.data["data"].created_at,
                    sender: response.data["data"].from.name,
                    message: response.data["data"].message,
                    type: response.data["data"].type,
                    record_length: response.data["data"].record_length

                }
                dispatch({
                    type: SEND_MESSAGE,
                    message: newMessage
                })
            }

        } catch (error) {
            console.log(error)
        }
    }
   }

}