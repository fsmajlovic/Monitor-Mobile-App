import React from 'react'
import { StyleSheet, View, Button } from 'react-native';


export default function TehnicianScreen({ navigation }) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
       <View style={{width: 150, height: 50 }}>
       <Button title="Add task" onPress={() => navigation.push("AddTask")}></Button>
       <View style={styles.space} />
      <Button title="Schedule" onPress={() => navigation.push("Schedule")}></Button>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  space: {
    width: 20, 
    height: 20
  },
})