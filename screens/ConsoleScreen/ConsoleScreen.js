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

  const sendRequest = async (command, token) => {

         fetch('http://109.237.36.76:25565/command', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Authorization" : "Bearer " + token,
          },
          body: JSON.stringify({
            name: 'Lejla',
            location: 'Lokacija',
            command: command
        })})
        .then(res => res.text())
        .then(res => { 
          console.log("DAAAA");
          addRows(res);
        });
    }

    const sendRequestToken = async (command) => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'whoso@whoso.com', password:  'sifra123'})
  };
 
  try {
      var response = await fetch('http://167.99.244.168:3333/login', requestOptions);
     //console.log(response.status)
 
            //console.log(x);
            if(response.status == 200)
            {
                var x = await response.json();
                token = x.accessToken;
                console.log(token);
                sendRequest(command,token);
            }
            else{
              //console.log("Error");
            }
        }catch(e){
      
        }

  } 

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
                if(group2.includes(command)){
                  command += " " + args[1];
                }
                sendRequestToken(command);
             //   sendRequest(command);
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