import React from 'react'
import { StyleSheet, View, Button } from 'react-native';


export default function TehnicianScreen({navigation}) {
    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
           <Button title="Add task" onPress={() => navigation.push("AddTask")}></Button>
          <Button title="Schedule" onPress={() => navigation.push("Schedule")}></Button>
        </View>
      );
}