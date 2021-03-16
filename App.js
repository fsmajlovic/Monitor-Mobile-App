import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabScreen from './screens/MainTabScreen/MainTabScreen';


const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: 'turquoise',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}>
        <Stack.Screen name="Home" component={MainTabScreen} options={{
          headerTitleStyle: { alignSelf: 'center', fontWeight: 'bold', fontStyle: 'italic', },
          title: 'Monitor',
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'papayawhip',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
