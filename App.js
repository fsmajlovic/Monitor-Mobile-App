import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainTabScreen from './screens/MainTabScreen/MainTabScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import LoadingScreen from './screens/LoginScreen/LoadingScreen';
import {AuthContext} from './contexts/authContext';



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
    signIn: () => {
      dispatch({type: 'LOGIN',isSignedIn: true });
    },
    signOut: () =>{
      console.log()
      dispatch({type: 'LOGOUT', isSignedIn: false}) 
    },

  }),[]);

  React.useEffect(()=>{
      setTimeout(()=>{
        dispatch({type:'RETRIEVE_TOKEN',isLoading:false})
      },1000);
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


