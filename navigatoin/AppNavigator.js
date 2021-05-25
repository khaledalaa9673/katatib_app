import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack';
import SelectAccountScreen from "../screens/SelectAccountScreen"
import LoginScreen from "../screens/LoginScreen"
import React,{useEffect} from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/HomeScreen"
import MyReadingsScreen from "../screens/MyReadingsScreen"
import SettingScreen from "../screens/SettingsScreen"
import { useSelector } from "react-redux"
import { Image, Platform, View ,Text  } from "react-native"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import  LiveSessions from "../screens/mySessions/LiveSessions"
 import  ScheduledSessions from "../screens/mySessions/ScheduledSessions"
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useDispatch} from "react-redux"
import {tryLogin} from "../store/authActions"
import SessionsListScreen from "../screens/mySessions/LearningSessions/SessionsListScreen"
import SessionScreen,{SessionScreenOptions} from "../screens/mySessions/LearningSessions/SessionScreen"
 





const Stack = createStackNavigator()

function SignStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Select Account" component={SelectAccountScreen}  />
      <Stack.Screen name="Login" component={LoginScreen} />


    </Stack.Navigator>
  );
}
 

const Sessions = createMaterialTopTabNavigator(); 

function SessionsNavigator() {
  return (
    <Sessions.Navigator   tabBarOptions={{
      activeTintColor:"#FFA500",
      inactiveTintColor:"rgba(0,0,0,.6)",
      indicatorStyle:{
        backgroundColor:"#FFA500"
      }
    
    }} >
    <Sessions.Screen name="learn" component={SessionsListScreen}  />
      <Sessions.Screen name="live" component={LiveSessions}  />
      <Sessions.Screen name="schedule" component={ScheduledSessions}  />
      
      

    </Sessions.Navigator>
  );
} 
const SessionsStack=createStackNavigator()
function SessionsStackNavigator() {
  return (
    <SessionsStack.Navigator >
      <SessionsStack.Screen name="My Sessions" component={SessionsNavigator} options={{
        headerStyle:{
          backgroundColor:"#FFA500",
         },
         headerTitleStyle: { alignSelf: 'center' },
       
      }} />
        <SessionsStack.Screen name="session" component={SessionScreen} options={SessionScreenOptions}  />
 

    </SessionsStack.Navigator>
  );
}

const Tabs = createBottomTabNavigator()  

function TabsNavigator() {
  return (
    <Tabs.Navigator     >
       <Tabs.Screen name="Home" component={HomeScreen} options={{
   tabBarLabel :({focused, color, size})=>{
    return   <Text style={{fontSize:12,color:focused ? "#FFA500":"rgba(0,0,0,.6)"}}>Home</Text>
  },
   tabBarIcon:({focused, color, size})=>{
     return <Image style={{width:30,height:30 }} source={focused ? require("../assets/images/homeactive.png") : require("../assets/images/home.png")} />
   }
 } }/>
 <Tabs.Screen name="My Readings" component={MyReadingsScreen} 
      options={{
        tabBarLabel :({focused, color, size})=>{
          return   <Text style={{fontSize:12,color:focused ? "#FFA500":"rgba(0,0,0,.6)"}}>My Readings</Text>
        },
        tabBarIcon:({focused, color, size})=>{
          return <Image style={{width:30,height:30}} source={focused ? require("../assets/images/readingsactive.png") : require("../assets/images/readings.png")} />
        },
        
      } }
      />
   
         <Tabs.Screen name="My Sessions" component={SessionsStackNavigator}
      options={{
        tabBarLabel :({focused, color, size})=>{
          return   <Text style={{fontSize:12,color:focused ? "#FFA500":"rgba(0,0,0,.6)"}}>My Sessions</Text>
        },
        tabBarIcon:({focused, color, size})=>{
          return <Image style={{width:30,height:30}} source={focused ? require("../assets/images/setionsactive.png") : require("../assets/images/setions1.png")} />
        }
      } } />
     
      
         <Tabs.Screen name="Settings" component={SettingScreen} options={{
 tabBarLabel :({focused, color, size})=>{
  return   <Text style={{fontSize:12,color:focused ? "#FFA500":"rgba(0,0,0,.6)"}}>Settings</Text>
},
       tabBarIcon:({focused, color, size})=>{
         return <Image style={{width:30,height:30}}  source={focused ? require("../assets/images/settingsactive.png") : require("../assets/images/settings.png")} />
       }
     } } />
      
   
      
    </Tabs.Navigator>
  )
}


const MainNavigator = () => {
  const auth = useSelector(state => !!state.auth.token)
  const dispatch=useDispatch()
   const getData = async () => {
      
      try {
        const token= await AsyncStorage.getItem("token")
        const user= await AsyncStorage.getItem("user")
     
        dispatch(tryLogin(token,user))

        
      } catch (error) {
        
      }
    
  }
  

  useEffect(()=>{
     getData()
   
  },[])
  return (
    <NavigationContainer>
      {!auth && <SignStack />}
      {auth && <TabsNavigator />}
    
    </NavigationContainer>

  )
}

export default MainNavigator









 