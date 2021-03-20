import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainTabScreen from './screens/MainTabScreen/MainTabScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import LoadingScreen from './screens/LoginScreen/LoadingScreen';
import {AuthContext} from './contexts/authContext';
import * as SecureStore from 'expo-secure-store'

async function saveToken(key,value){
  await SecureStore.setItemAsync(key,value);
}

async function getToken(key){
      let userToken = await SecureStore.getItemAsync(key);
      console.log(userToken);
      return userToken;
}


export default function App() {
  const initialLoginState={
    isLoading:true,
    isSignedIn:false,
  };

  const loginReducer = (prevState, action) =>{
    switch(action.type){
      case 'RETRIEVE_TOKEN':
        return{
          ...prevState,
          isLoading:action.isLoading,
          isSignedIn:action.isSignedIn,
        };
      case 'LOGIN':
        return{
          ... prevState,
          isSignedIn: action.isSignedIn,
        };
      case 'LOGOUT':
        return{
          ... prevState,
          isSignedIn:action.isSignedIn,
        };       
    }
  };
  
  const [loginState, dispatch] = React.useReducer(loginReducer,initialLoginState);

  const authContext = React.useMemo(()=>({
    signIn: async (username,password) => {
        await saveToken('userToken',password);
        dispatch({type: 'LOGIN',isSignedIn: true});
    },
    signOut: async () =>{
      //await SecureStore.deleteItemAsync('Sifra');
      dispatch({type: 'LOGOUT', isSignedIn: false}) 
    },

    getSavedToken: async () =>{
      return await getToken('userToken');
    }

  }),[]);

  React.useEffect(()=>{
    const token = async () => {
      let userToken;

      try {
        userToken = await getToken('userToken');
      } catch (e) {
        console.log(e);
      }
      if(userToken===null)
        dispatch({ type: 'RETRIEVE_TOKEN', isLoading:false,isSignedIn:false});
      else
        dispatch({ type: 'RETRIEVE_TOKEN', isLoading:false,isSignedIn:true});
      };
      token();       
  },[]);
  
 

  return (
    
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
        {loginState.isLoading==true ? 
          (<LoadingScreen/>) :
          (loginState.isSignedIn!==true ? <LoginScreen/>:( <MainTabScreen/>)) 
        }
    </NavigationContainer>
    </AuthContext.Provider>
    
  );
}


