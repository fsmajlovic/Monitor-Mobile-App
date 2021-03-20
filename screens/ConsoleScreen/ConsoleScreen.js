import React, {useState} from 'react'
import {Text, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ConsoleRow from './ConsoleRow'
import {styles} from './Styles' 

export default function ConsoleScreen({navigation}) {
  const [rows, setRows] = useState([]);

  const [history,setHistory] = useState("console > ");
  const [current,setCurrent] = useState("");

  const group1 = ["?", "clear", "ls"];
  const group2 = ["cd", "echo", "erase", "kill", "move", "rd", "set"];

  const addRows = (tekst) => {
    setRows((prevRows) => {
      return (
        [...prevRows, tekst]
      )
    })
  }

  const sendRequest = async (command) => {

    fetch('http://109.237.36.76:25565/komanda/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                command: {
                    komanda: command,
                }
            })
          }).then(response => response.text()).then(res => {
              addRows(res);
          });
         };

  return(
    <View style={styles.container}>
      <ScrollView>
        <ConsoleRow rows={rows}/>
        <View style={styles.row}>
          <Text style={styles.textArea}>IWM console > </Text>
          <TextInput 
            style={styles.inputArea} 
            value={current}
            onChangeText={(e)=>setCurrent(e)}
            placeholder="Enter your commands here"
            placeholderTextColor="#bbbbbb" 
            onSubmitEditing={(event) => {
              let input = event.nativeEvent.text.replace(/ +/g, ' ').trim();
              let args = input.split(" ");
              let command = "";
              command = args[0].toLowerCase();

              addRows("IWM console > " + event.nativeEvent.text);

              if( (group1.includes(command) && args.length == 1) || (group2.includes(command) && args.length == 2) ) {
                sendRequest(command + " " + args[1]);
                console.log("validna komanda");
              } else {
                //nevalidna komanda
                console.log("nevalidna komanda");
                addRows("Invalid command!");
              }

              setCurrent("");
          }}></TextInput>
        </View>
      </ScrollView>
    </View>
  );
}