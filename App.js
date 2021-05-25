// import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import MainNavigator from "./navigatoin/AppNavigator"
import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { Provider, useDispatch, useSelector } from "react-redux"
import authReducer from "./store/authReducer"
import {getSessions} from "./store/sessionsActions"
import {tryLogin } from "./store/authActions"
import SessionsReducer from "./store/sessionsReducer"


 

const root = combineReducers({
  auth: authReducer,
  sessions:SessionsReducer
})
const store = createStore(root, applyMiddleware(thunk))
setTimeout(() => {
 console.log( store.getState())
}, 15000);
 

export default function App() {

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <MainNavigator />
      </Provider>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop:40
    flex: 1

  },
});
