import React, { useState } from 'react'
import { Text, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DeviceContext } from '../../contexts/DeviceContext';
import ConsoleRow from './ConsoleRow'
import { styles } from './Styles'
import { AuthContext } from '../../contexts/authContext';
import { serverURL } from '../../appConfig';
import { useContext } from 'react';

export default function ConsoleScreen({ navigation }) {
  //console.log(naziv);
  const group1 = ["?", "clear", "ls"];
  const group2 = ["cd", "echo", "erase", "kill", "move", "rd", "set"];

  const [rows, setRows] = useState([]);
  const [current, setCurrent] = useState("");
//  const { activeDevice } = useContext(DeviceContext);
//  console.log(activeDevice);

  const { getSavedToken } = React.useContext(AuthContext);

  const addRows = (tekst) => {
    setRows((prevRows) => {
      return (
        [...prevRows, tekst]
      )
    })
  };

  const getActiveDevices = async (token) => {
/*
    console.log("Dosao neki zahtjev");

    fetch('https://si-grupa5.herokuapp.com/api/agent/online', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        "Authorization": "Bearer " + token,
      }
    })
      .then(res =>   {
        console.log("bla");
      }); */

  }

  const sendRequest = async (command, token) => {

    console.log("Token je " + token);

    //serverURL+ 'api/command'

    fetch('https://si-grupa5.herokuapp.com/api/command', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({
        'name': activeDevice.name,
        'location': activeDevice.location,
        'ip': 'ip',
        command: command,
        parameters: [],
        user: 'whoso@whoso.com'
      })
    })
      .then(res => res.json())
      .then(res => {
        //  Token = res.token;

        console.log("poruka " + res.message);

        if (typeof res.message === 'undefined') {
          addRows("Client server is not responding!");

        } else {
          addRows(res.message);
        }
      });
  }

  return (
    <View style={styles.container}>
      
      <ScrollView>
        <ConsoleRow rows={rows} />
        <View style={styles.row}>
          <Text style={styles.textArea}>IWM console > </Text>
          <TextInput
            style={styles.inputArea}
            value={current}
            onChangeText={(e) => setCurrent(e)}
            placeholder="Enter your commands here"
            placeholderTextColor="#bbbbbb"
            onSubmitEditing={async (event) => {
              let input = event.nativeEvent.text.replace(/ +/g, ' ').trim();
              let args = input.split(" ");
              let command = "";
              command = args[0].toLowerCase();

              
              addRows("IWM console > " + event.nativeEvent.text);

              if ((group1.includes(command) && args.length == 1) || (group2.includes(command) && args.length == 2)) {
                //validna komanda
                if (group2.includes(command)) {
                  command += " " + args[1];
                }

                let token = await getSavedToken();
            //    getActiveDevices(token);
              //  sendRequest(command, token);
              } else {
                //nevalidna komanda
                addRows("Invalid command!");
              }

              setCurrent("");
            }}></TextInput>
        </View>
      </ScrollView>
    </View>
  );
}