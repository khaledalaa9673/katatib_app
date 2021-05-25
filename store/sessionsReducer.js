import {GET_SESSIONS,GET_CHAT,SEND_MESSAGE} from "./sessionsActions"

const initialState={
    sessions:[],
    selectedMessages:[],
 
   
}
const SessionsReducer=(state=initialState,action)=>{
   switch (action.type) {
      case GET_SESSIONS:
          return{
              ...state,
             sessions:action.sessions
         }
         case GET_CHAT:
             return {
                 ...state,
                 selectedMessages:action.messages,
             
             }
         case SEND_MESSAGE:
             return{
                 ...state,
                 selectedMessages:state.selectedMessages.concat(action.message)
             }
      default:
          return state
}
}


export default SessionsReducer