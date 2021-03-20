import React, {useState} from 'react'
import {Text, View} from 'react-native';
import {styles} from './Styles' 
  
export default function ConsoleRow({rows}) {

  return(
    <View>
        {rows.map((row,index) => {
            return(
              <View key={index} style={styles.row}>
                <Text style={styles.textArea}>{row}</Text>
              </View>
            ) 
        })}
  </View>
)};