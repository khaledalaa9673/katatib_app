import React, { useEffect , useState} from "react"
import { View, Text, StyleSheet, FlatList, ActivityIndicator} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { getSessions } from "../../../store/sessionsActions"
import SessionItem from "../../../components/SessionItem"
import { TouchableOpacity } from "react-native-gesture-handler"
 


const SessionsListScreen = (props) => {

  const dispatch = useDispatch()
  const sessionsList = useSelector(state => state.sessions.sessions)
  const [loading,setLoading]=useState(false)
   
  const getsessionsList=async()=>{
   setLoading(true)
    await  dispatch(getSessions())
    setLoading(false)
  }

  useEffect(() => {
      getsessionsList()
    }, [])
if(loading){
  return <View style={{...styles.container,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size="large" color="black" /></View>
}
  return (
      <View style={styles.container}>

        <Text style={{margin:15,marginBottom:0,textAlign:"right",fontSize:24}}>جلسات التعلم({sessionsList.length})</Text>
      <FlatList
       onRefresh={getsessionsList}
       refreshing={loading}
       contentContainerStyle={{alignItems:"center"}}
       data={sessionsList}
       keyExtractor={(item,index)=>index.toString()}
       renderItem={({item})=>(
        <TouchableOpacity activeOpacity={.9} onPress={()=>{
          props.navigation.navigate("session",{
            chatId:item.chatId,
            name:item.content,
           
          })
        }}>
          <SessionItem 
          content={item.content}
           reading_type={item.reading_type}
            rate_text={item.rate_text} 
            status_text={item.status_text} 
            student_name={item.student_name}
            time={item.create_at}
            />
           
 
        </TouchableOpacity>
      )} />
              
   
      </View>


  )
}

const styles = StyleSheet.create({

  container: {

flex:1,
backgroundColor:"#eeee"
  }
})

export default SessionsListScreen