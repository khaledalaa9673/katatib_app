import {LOGIN,TRY_AUTO_LOGIN} from "./authActions"
const initialState={
    token:null,
    user:null,
   
}
const authReducer=(state=initialState,action)=>{
   switch (action.type) {
      case LOGIN:
          
         return{
             
             token:action.token,
             user:action.user
         }
       case TRY_AUTO_LOGIN:
           return{
            token:action.token,
            user:action.user
       }  
      default:
          return state
}
}


export default authReducer