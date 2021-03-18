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
  const [isLoading, setIsLoading] = React.useState(true);
  
  const authContext = React.useMemo(()=>({
    signIn: () => {
      setIsLoading(false)
    },
    signOut: () =>{
      setIsLoading(true);  
    },

  }));

  // React.useEffect(()=>{
  //     setTimeout(()=>{
  //       setIsLoading(false)
  //     },1000);
  // },[]);
  


  return (
    
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>   
        {isLoading!==true ?
          (<MainTabScreen/>
          ):(
           <LoginScreen/>
          )}
    </NavigationContainer>
    </AuthContext.Provider>
    
  );
}


