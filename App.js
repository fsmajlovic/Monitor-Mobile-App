import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const HomeScreen = ({navigation}) =>{
  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home screen</Text>
      <Button title="Go to Report"
       onPress={() => navigation.navigate("Report")}
      />
      <Button title="Go to Console"
       onPress={() => navigation.navigate("Console")}
      />
      <Button title="Go to Access and Control"
       onPress={() => navigation.navigate("AccessControl")}
      />
      <Button title="Go to Tehnician"
       onPress={() => navigation.navigate("Tehnician")}
      />
    </View>
  );
};


const ReportScreen = ({navigation}) =>{
  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Report Screen</Text>
      <Button title="Go to Report"
       onPress={() => navigation.navigate("Report")}
      />
      <Button title="Go to Console"
       onPress={() => navigation.navigate("Console")}
      />
      <Button title="Go to Access and Control"
       onPress={() => navigation.navigate("AccessControl")}
      />
      <Button title="Go to Tehnician"
       onPress={() => navigation.navigate("Tehnician")}
      />
    </View>
  );
};

const ConsoleScreen = ({navigation}) =>{
  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Console Screen</Text>
      <Button title="Go to Report"
       onPress={() => navigation.navigate("Report")}
      />
      <Button title="Go to Console"
       onPress={() => navigation.navigate("Console")}
      />
      <Button title="Go to Access and Control"
       onPress={() => navigation.navigate("AccessControl")}
      />
      <Button title="Go to Tehnician"
       onPress={() => navigation.navigate("Tehnician")}
      />
    </View>
  );
};

const AccessControlScreen = ({navigation}) =>{
  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Access Control Screen</Text>
      <Button title="Go to Report"
       onPress={() => navigation.navigate("Report")}
      />
      <Button title="Go to Console"
       onPress={() => navigation.navigate("Console")}
      />
      <Button title="Go to Access and Control"
       onPress={() => navigation.navigate("AccessControl")}
      />
      <Button title="Go to Tehnician"
       onPress={() => navigation.navigate("Tehnician")}
      />
    </View>
  );
};

const TehnicianScreen = ({navigation}) =>{
  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Tehnician Screen</Text>
      <Button title="Go to Report"
       onPress={() => navigation.navigate("Report")}
      />
      <Button title="Go to Console"
       onPress={() => navigation.navigate("Console")}
      />
      <Button title="Go to Access and Control"
       onPress={() => navigation.navigate("AccessControl")}
      />
      <Button title="Go to Tehnician"
       onPress={() => navigation.navigate("Tehnician")}
      />
    </View>
  );
};


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
        <Stack.Screen name="Console" component={ConsoleScreen} />
        <Stack.Screen name="AccessControl" component={AccessControlScreen} />
        <Stack.Screen name="Tehnician" component={TehnicianScreen} />
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
