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
         <View style={{flexDirection: 'row', marginTop: 30}}>
         <TouchableOpacity 
                      onPress={() => navigation.push("AddTask")}
                      style={styles.touchableOpacity}
                  >
                      <View style={styles.containerIcon}>
                          <MaterialIcons name="note-add" size={80} color="#E50914" />
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
                          <Fontisto name="date" size={80} color="#E50914" />
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
containerTitle: {
  justifyContent: 'center',
   backgroundColor:"#E50914",
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
  marginLeft:30,
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
