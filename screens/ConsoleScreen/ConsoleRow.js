import React from 'react'
import {Text, View} from 'react-native';
import {styles} from './Styles' 
  
export default function ConsoleRow({rows}) {

  const group1 = ["?", "clear", "ls"];
  const group2 = ["cd", "echo", "erase", "kill", "move", "rd", "set"];

  return(
    <View>
        {rows.map((row,index) => {
          let input = row.replace(/ +/g, ' ').trim();
          let args = input.split(" ");
          let command = "";
          command = args[0].toLowerCase();

          //komanda iz grupe 1 i nije uneseno ništa iza nje || komanda iz grupe 2 i unesen 1 parametar
          if( (group1.includes(command) && args.length == 1) || (group2.includes(command) && args.length == 2) ) {
            //komanda validna
            return(
              <View key={index}>
                <View style={styles.row}>
                  <Text style={styles.textArea}> IWM console > {row}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.textArea}> Valid Command! </Text>
              </View>
            </View>
            ) 
          } else {
            //nevalidna komanda
            return(
              <View key={index}>
                <View style={styles.row}>
                  <Text style={styles.textArea}> IWM console > {row}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.textArea}> Invalid Command! </Text>
              </View>
            </View>
            ) 
          }

        /*  return(
            <View style={styles.row} key={index}>
              <Text style={styles.textArea}> IWM console > {row}</Text>
            </View>
          ) */
        })}
  </View>
)};