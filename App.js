import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainTabScreen from './screens/MainTabScreen/MainTabScreen';

export default function App() {
  return (
    <NavigationContainer>
       <MainTabScreen/>
    </NavigationContainer>
    
  );
}


