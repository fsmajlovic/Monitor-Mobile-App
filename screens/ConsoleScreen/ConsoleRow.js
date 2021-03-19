import React from 'react'
import {Text, View} from 'react-native';
import {styles} from './Styles' 
  
export default function ConsoleRow({rows}) {

  return(
    <View>
        {rows.map((row,index) => {
          return(
            <View style={styles.row} key={index}>
              <Text style={styles.textArea}> IWM console > {row}</Text>
            </View>
          ) 
        })}
  </View>
)};