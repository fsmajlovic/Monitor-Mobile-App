import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function TehnicianScreen({navigation}) {
  return(
       <View style={styles.container}>
         <View  style={styles.containerTitle}>
              <Text style={styles.textTitle}>Hi tehnician</Text>
         </View>
         <View style={styles.containerButtons}>
         <TouchableOpacity 
                      onPress={() => navigation.push("AddTask")}
                      style={styles.touchableOpacity}
                  >
                      <View style={styles.containerIcon}>
                          <MaterialIcons name="note-add" size={80} color="#0D47A1" />
                          <Text style={styles.iconText}>
                              Add Task
                          </Text>
                      </View>
                  </TouchableOpacity>
                  <TouchableOpacity 
                      onPress={() => navigation.push("Schedule")}
                      style={styles.touchableOpacity}
                  >
                      <View style={styles.containerIcon}>
                          <Fontisto name="date" size={80} color="#0D47A1" />
                          <Text style={styles.iconText}>
                              Schedule
                          </Text>
                      </View>
                  </TouchableOpacity>
         </View>
       </View>
  )
    
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: "#FFF",
},
containerButtons: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 30
},
containerTitle: {
  justifyContent: 'center',
   backgroundColor:"#0D47A1",
   height:"10%",
   margin: 10,
   borderRadius:30,
   paddingLeft:30,
   marginTop: 30
},
textTitle: {
  fontSize:24,
  color:"#FFF",
  fontWeight:"bold"
},
touchableOpacity: {
  height:250,
  elevation:15,
  backgroundColor:"white",
  marginTop:30,
  borderRadius:15,
  marginBottom:10,
  width:160
},
containerIcon: {
  flexDirection:"column",
  alignItems: 'center',
  paddingTop: 70
},
iconText: {
  justifyContent: 'center',
  fontWeight:"bold",
  color:"#333",
  fontSize: 16,
  marginTop: 30
}
})
