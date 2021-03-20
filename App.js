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
import axios from 'axios'
import {URL} from './appConfig'

async function saveToken(key,value){
  await SecureStore.setItemAsync(key,value);
}

async function getToken(key){
      let userToken = await SecureStore.getItemAsync(key);
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
      try {
        const response = await axios.post(URL+'login',{
          email:username,
          password:password
        });        
        if(response.status==200){
          await saveToken('userToken',response.data.accessToken);
          dispatch({type: 'LOGIN',isSignedIn: true});
        }else{
          alert("Greška!");
          dispatch({type: 'LOGIN',isSignedIn: false});
        }
      } catch (error) {
        alert("Pogrešni podaci!")
        dispatch({type: 'LOGIN',isSignedIn: false});
      }
    },
    signOut: async () =>{
      await SecureStore.deleteItemAsync('userToken');
      dispatch({type: 'LOGOUT', isSignedIn: false}) 
    },

    getSavedToken: async () =>{
      return await getToken('userToken');
    }

  }),[]);

  React.useEffect(()=>{
    const tokenFunction = async () => {
      let userToken;
      let check;
      try {
        userToken = await getToken('userToken');
        check = await axios.get(URL+'jwt/verify',{
          headers:{
            'Authorization': `Bearer ${userToken}`
             }
          }
        )
        await saveToken('userToken',check.data.accessToken)
        dispatch({ type: 'RETRIEVE_TOKEN', isLoading:false,isSignedIn:true});
      } catch (e) {
        dispatch({ type: 'RETRIEVE_TOKEN', isLoading:false,isSignedIn:false});
      }
       
      };
      tokenFunction();       
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


