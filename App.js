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
  //const [isLoading, setIsLoading] = React.useState(true);
  const initialLoginState={
    isLoading:true,
  };

  const loginReducer = (prevState, action) =>{
    switch(action.type){
      case 'RETRIEVE_TOKEN':
        return{};
      case 'LOGIN':
        return{
          ... prevState,
          isLoading: action.isLoading,
        };
      case 'LOGOUT':
        return{
          ... prevState,
          isLoading:action.isLoading,
        };       
    }
  };
  
  const [loginState, dispatch] = React.useReducer(loginReducer,initialLoginState);

  const authContext = React.useMemo(()=>({
    signIn: () => {
      dispatch({type: 'LOGIN',isLoading: false });
    },
    signOut: () =>{
      console.log()
      dispatch({type: 'LOGOUT', isLoading: true}) 
    },

  }),[]);

  // React.useEffect(()=>{
  //     setTimeout(()=>{
  //       setIsLoading(false)
  //     },1000);
  // },[]);
  


  return (
    
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>   
        {loginState.isLoading!==true ?
          (
            <MainTabScreen/>
          ):(
            <LoginScreen/>
          )}
    </NavigationContainer>
    </AuthContext.Provider>
    
  );
}


